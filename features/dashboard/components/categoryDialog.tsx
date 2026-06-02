import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/Form";

const colorsHex = [
  "#98FB98",
  "#ADD8E6",
  "#FFB6C1",
  "#FFE4B5",
  "#F08080",
  "#FFD700",
  "#C71585",
  "#9370DB",
  "#20B2AA",
  "#3CB371",
];
const icons = ["💰", "👤", "🎉", "📅", "🚀", "📢", "🎓", "🏆", "💡", "🔔"];

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Category name must be at least 5 characters.")
    .max(32, "Category name must be at most 32 characters."),
  icon: z.string().min(1, "Category icon is required."),
  color: z.string().min(1, "Category color is required."),
});

export default function CategoryDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      color: "",
    },
  });

  async function handleAddCategory(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/category", values);
      if (response.data) {
        setIsOpen(false);
      }
      toast.success("Category added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add category");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-2xl font-bold "}>
            Add Category
          </DialogTitle>
          <DialogDescription className={"text-sm"}>
            Add a new category to the list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}     >
          <form onSubmit={form.handleSubmit(handleAddCategory)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input className="h-10" placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="font-bold text-sm mb-2 block">Colors</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-4">
                    {colorsHex.map((color) => (
                      <Button
                        type="button"
                        onClick={() => field.onChange(color)}
                        key={color}
                        className={cn(
                          "size-10 rounded-full ring-2 ring-offset-2 transition-all ring-transparent hover:scale-105",
                          field.value === color ? "ring-blue-500" : "",
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="font-bold text-sm mb-2 block">Icons</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-4">
                    {icons.map((icon) => (
                      <Button
                        type="button"
                        onClick={() => field.onChange(icon)}
                        key={icon}
                        className={cn(
                          "size-10 rounded-md ring-2 ring-offset-2 transition-all ring-transparent hover:scale-105",
                          field.value === icon ? "ring-blue-500" : "",
                        )}
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex space-x-3 mt-4  justify-end">
          
          <Button
            className={
              "inline-flex items-center  justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-700 text-brand-50 shadow hover:bg-brand-800 h-11 px-4 py-2"
            }
            onClick={() => {
              setIsOpen(false);
            }}
            disabled={isLoading}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className={
              "inline-flex items-center  cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-700 text-brand-50 shadow hover:bg-brand-800 h-11 px-4 py-2 bg-blue-500"
            }
            disabled={isLoading}
            type="submit"
            variant="default"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />{" "}
                <span className="ml-2">Adding...</span>
              </>
            ) : (
              "Add new Category"
            )}
          </Button>
        </div>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
