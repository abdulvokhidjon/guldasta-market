import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { getFormData } from "../lib/my-utils/index";
import { login } from "../request";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const admin = useAppStore((state) => state.admin);
  console.log(admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    setLoading(true);
    console.log("result: ", result);

    login(result)
      .then((res) => {
        console.log(res);

        setAdmin(res);
        toast.success("Siz saytga muvaffaqiyatli kirdingiz!");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-5"
      >
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-center text-3xl font-bold tracking-wider">
            Guldasta Market
          </h2>
          <div className="relative h-20 w-20 md:h-28 md:w-28">
            <img
              src="flowerImage.avif"
              id="flowerImage"
              className="h-full w-full rounded-full object-cover"
              alt="Flower"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="username">Foydalanuvchining Ismi</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Ismingizni kiriting"
          />
        </div>
        <div className="mb-5">
          <Label htmlFor="password">Foydalanuvchining maxfiy so'zi</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Maxfiy so'zni kiriting"
          />
        </div>
        <div>
          <Button className="flex w-full items-center gap-3" disabled={loading}>
            {loading ? (
              <>
                Tekshirilmoqda <UpdateIcon className="animate-spin" />{" "}
              </>
            ) : (
              "Kirish"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
