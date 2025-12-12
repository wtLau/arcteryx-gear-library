"use client";
import { supabase } from "@/lib/supabase";
import { use, useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [category, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItemsByCategory();
  }, []);

  async function fetchItemsByCategory() {
    try {
      const { data, error } = await supabase
        .from("item_categories")
        .select("*")
        .eq("category_id", slug);

      // Step 2: Get the item IDs
      const itemIds = data?.map((item) => item.item_id); // Extract item_ids

      // Step 3: Fetch the actual items from the items table using the item_ids
      if (itemIds?.length === 0) {
        console.log("No items found for this category.");
        return [];
      }

      const { data: items, error: itemsError } = await supabase
        .from("items")
        .select("*")
        .in("id", itemIds || []); // Fetch items where the item id matches one of the item_ids

      console.log(data);
      console.log(items);

      if (error) throw error;
      setItems([] as any);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  }

  return <div>My Post: {slug}</div>;
}
