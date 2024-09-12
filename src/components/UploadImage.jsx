import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { uploadImage } from "../request";
import { toast } from "sonner";
import { UpdateIcon } from "@radix-ui/react-icons";

export default function UploadImage() {
  const [value, setValue] = useState(null);
  function handleUploadImage(image) {
    toast.promise(
      uploadImage(image).then((res) => {
        const imageUrl = res.url; // Yangi URL o'zgaruvchi
        setValue(imageUrl);
        return imageUrl;
      }),
      {
        loading: "Rasm yuklanmoqda...",
        success: () => `Rasm muvaffaqiyatli qo'shildi.`,
        error: ({ message }) => message,
      },
    );
  }

  return (
    <div className="w-full">
      <Label className="ml-2">Rasim Yuklang..</Label>
      <Tabs defaultValue="local" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="local">
            Local
          </TabsTrigger>
          <TabsTrigger className="w-full" value="url">
            URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Label className="mb-3 block">
            <span
              className={`w-full py-1 ${buttonVariants({ variant: "outline" })}`}
            >
              {!value ? <PlusCircleIcon /> : <UpdateIcon/>}
            </span>
            <Input
              onChange={({ target: { files } }) => handleUploadImage(files[0])}
              accept="image/*" //faqat rasm yuklash uchun shundan foydalanamiz.
              className="sr-only"
              type="file"
            />
          </Label>
          {value && <img src={value} alt="Uploaded image from local machine" />}
        </TabsContent>
        <TabsContent value="url">
          <Label htmlFor="url" className="mb-1 ml-2">
            Havola*
          </Label>
          <Input
            id="url"
            placeholder=" Rasimni havolasini kiriting"
            className="w-full"
            type="url"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
