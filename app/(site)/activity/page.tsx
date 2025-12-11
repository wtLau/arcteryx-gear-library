"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomsPage() {
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
  }, []);

  async function fetchCategory() {
    try {
      const { data, error } = await supabase.from("items").select(`
      *,
      item_categories (
        categories (
          name
        )
      )
    `);

      const flattenedData = data?.map((item) => ({
        ...item,
        // Extract the first category name
        category: item.item_categories[0]?.categories?.name || null,
      }));

      console.log(flattenedData);

      if (error) throw error;
      setCategory(flattenedData as any);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Rooms</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Choose from our selection of beautifully designed spaces. Each room
          comes with premium amenities for your comfort.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* All Amenities Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          All catorgy Include
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.map((foo) => (
            <div
              key={foo.id}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <span className="font-medium">{foo.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
