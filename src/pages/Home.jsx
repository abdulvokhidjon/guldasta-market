import { useEffect, useState } from "react";
import { useAppStore } from "../lib/zustand";
import { collectItem, getFormData, limit } from "../lib/my-utils";
import { deleteFlower, getFlowers, refreshToken } from "../request";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusIcon,
  SymbolIcon,
  UpdateIcon,
  GridIcon,
  TrashIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { Button, buttonVariants } from "../components/ui/button";
import AddNewItemModal from "../components/AddNewItemModal";
import { MyPagination } from "../components/MyPagination";
import FiltersByCategory from "../components/FiltersByCategory";
import FiltersByCountry from "../components/FiltersByCountry";
import FiltersByColor from "../components/FiltersByColor";

export default function Home() {
  const [sendingData, setSendingData] = useState(null);
  const [enableToFilter, setEnableToFilter] = useState(true);
  const [isFiltered, setIsFiltered] = useState(null);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const flowers = useAppStore((state) => state.flowers);
  const setFlowers = useAppStore((state) => state.setFlowers);
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  const reset = () => {
    setIsFiltered(null);
    setEnableToFilter(true);
  };

  const handleEnableToFilter = () => {
    setEnableToFilter(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    setIsFiltered(result);
  };

  useEffect(() => {
    setLoading(true);
    getFlowers(admin?.access_token, { skip, limit }, isFiltered)
      .then(({ data, total }) => {
        setTotal(total);
        setFlowers(data);
      })
      .catch(({ message }) => {
        if (message === "403") {
          refreshToken(admin?.refresh_token)
            .then(({ access_token }) => {
              setAdmin({ ...admin, access_token });
            })
            .catch(() => {
              toast.info("Tizimga qayta kiring!");
              setAdmin(null);
            });
        }
      })
      .finally(() => setLoading(false));
  }, [admin, skip, isFiltered, sendingData]);

  const handleDelete = (id) => {
    deleteFlower(admin?.access_token, id)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <>
      <div className="base-container mb-5">
        <div className="mb-5 flex items-center justify-between py-5">
          <h2 className="h2">Boshqaruv paneli</h2>
          <Button disabled={!flowers} onClick={setAddItemModal}>
            Qo'shish
            <PlusIcon className="ml-2" />
          </Button>
        </div>
        {flowers && (
          <form onSubmit={handleFilter}>
            <FiltersByCategory
              categories={collectItem(flowers, "category")}
              handleEnableToFilter={handleEnableToFilter}
            />
            <FiltersByCountry
              countries={collectItem(flowers, "country")}
              handleEnableToFilter={handleEnableToFilter}
            />
            <FiltersByColor
              colors={collectItem(flowers, "color")}
              handleEnableToFilter={handleEnableToFilter}
            />

            <div className="flex gap-2">
              <Button
                variant={"outline"}
                onClick={reset}
                type="reset"
                disabled={enableToFilter}
              >
                Tozalash <SymbolIcon className="ml-2" />
              </Button>
              <Button type="submit" disabled={enableToFilter}>
                Saralash <GridIcon className="ml-2" />
              </Button>
            </div>
          </form>
        )}
        <div>
          <Table>
            {flowers && (
              <TableCaption className="mb-5">
                Gullar haqida ma'lumot.
              </TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Gul Nomi</TableHead>
                <TableHead>Turkumi</TableHead>
                <TableHead>Rangi</TableHead>
                <TableHead className="text-right">Narxi</TableHead>
                <TableHead className="text-right">Harakatlar</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {flowers?.map(({ name, id, category, color, price }) => {
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell>
                      {" "}
                      <span
                        style={{ backgroundColor: color }}
                        className="block h-4 w-4 rounded-full border"
                      ></span>
                    </TableCell>
                    <TableCell className="text-right">{price} so'm</TableCell>
                    <TableCell className="flex items-center justify-end gap-2 text-right">
                      <TooltipProvider delayDuration="0">
                        <Tooltip>
                          <TooltipTrigger>
                            <span
                              type="button"
                              className={`${buttonVariants({ variant: "secondary", size: "icon" })}`}
                            >
                              <Pencil1Icon />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Tahrirlash</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider delayDuration="0">
                        <Tooltip>
                          <TooltipTrigger onClick={() => handleDelete(id)}>
                            <span
                              type="button"
                              className={`${buttonVariants({ variant: "destructive", size: "icon" })}`}
                            >
                              <TrashIcon />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>O'chirish</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {flowers && (
            <MyPagination
              setSkip={setSkip}
              total={total}
              skip={skip}
              pageCount={Math.ceil(total / limit)}
            />
          )}
        </div>

        {loading && (
          <div className="mt-60 flex w-full items-center justify-center gap-3 font-bold">
            <UpdateIcon className="animate-spin" />
            <h3>Yuklanmoqda...</h3>
          </div>
        )}
      </div>

      <AddNewItemModal
        sendingData={sendingData}
        setSendingData={setSendingData}
      />
    </>
  );
}
