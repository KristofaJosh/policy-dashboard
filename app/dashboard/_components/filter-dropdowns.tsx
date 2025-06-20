"use client";

import { getRecommendations } from "@/app/dashboard/_actions/get-recommendations";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, use, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X } from "lucide-react";
import type { SearchFilters, Framework } from "@/types";

export function FilterDropdownComponent({
  recommendationPromise,
}: {
  recommendationPromise: ReturnType<typeof getRecommendations>;
}) {
  const {
    data: { availableTags: filters },
  } = use(recommendationPromise);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [filterOptions, setFilterOptions] = useState<SearchFilters>({
    frameworks: [],
    cloudProviders: [],
    classes: [],
    reasons: [],
  });

  const getActiveFilterCount = () => {
    return (
      filterOptions.frameworks.length +
      filterOptions.cloudProviders.length +
      filterOptions.classes.length +
      filterOptions.reasons.length
    );
  };

  const onFiltersChange = useCallback(
    (newFilters: Partial<SearchFilters>) => {
      const filterType = Object.keys(newFilters)[0] as keyof SearchFilters;
      const newValues = newFilters[filterType] as string[];
      const params = new URLSearchParams(searchParams.toString());
      if (newValues.length > 0) {
        params.set(filterType, newValues.join(","));
      } else {
        params.delete(filterType);
      }
      setFilterOptions((filters) => ({ ...filters, [filterType]: newValues }));
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilterOptions({
      frameworks: params.frameworks?.split(",") || [],
      cloudProviders: params.cloudProviders?.split(",") || [],
      classes: params.classes?.split(",") || [],
      reasons: params.reasons?.split(",") || [],
    });
  }, [searchParams]);

  const clearAllFilters = () => {
    setFilterOptions({
      frameworks: [],
      cloudProviders: [],
      classes: [],
      reasons: [],
    });
    const params = new URLSearchParams(searchParams.toString());
    params.delete("frameworks");
    params.delete("cloudProviders");
    params.delete("classes");
    params.delete("reasons");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const removeFilter = (filterType: keyof SearchFilters, value: string) => {
    const currentValues = filterOptions[filterType] as string[];
    const newValues = currentValues.filter((v) => v !== value);
    onFiltersChange({ [filterType]: newValues });
  };

  const handleFilterChange = (
    filterType: keyof SearchFilters,
    value: string,
    checked: boolean,
  ) => {
    const currentValues = filterOptions[filterType] as string[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onFiltersChange({ [filterType]: newValues });
  };

  const FilterPopover = ({
    title,
    filterKey,
    options,
  }: {
    title: string;
    filterKey: keyof SearchFilters;
    options: string[] | Framework[];
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Filter className="w-4 h-4 mr-2" />
          {title}
          {(filterOptions[filterKey] as string[])?.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
              {(filterOptions[filterKey] as string[])?.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{title}</h4>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {options.map((option) => {
              const value = typeof option === "string" ? option : option.name;
              const id = typeof option === "string" ? option : option.id;
              const isChecked = (
                filterOptions[filterKey] as string[]
              )?.includes(typeof option === "string" ? option : option.id);

              return (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleFilterChange(filterKey, id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4 mb-4">
      <div className="flex flex-wrap gap-2">
        <FilterPopover
          title="Frameworks"
          filterKey="frameworks"
          options={filters.frameworks}
        />
        <FilterPopover
          title="Cloud Providers"
          filterKey="cloudProviders"
          options={filters.cloudProviders}
        />
        <FilterPopover
          title="Risk Classes"
          filterKey="classes"
          options={filters.classes}
        />
        <FilterPopover
          title="Reasons"
          filterKey="reasons"
          options={filters.reasons}
        />

        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-8 text-muted-foreground"
          >
            Clear all ({getActiveFilterCount()})
          </Button>
        )}
      </div>

      {/* Active Badge Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filterOptions.frameworks.map((framework, idx) => {
            const frameworkName =
              filters.frameworks.find((f) => f.id === framework)?.name ||
              framework;
            return (
              <Badge key={idx} variant="secondary" className="gap-1">
                {frameworkName}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeFilter("frameworks", framework)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            );
          })}

          {filterOptions.cloudProviders.map((provider) => (
            <Badge key={provider} variant="secondary" className="gap-1">
              {provider}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter("cloudProviders", provider)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}

          {filterOptions.classes.map((riskClass) => (
            <Badge key={riskClass} variant="secondary" className="gap-1">
              Risk: {riskClass}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter("classes", riskClass)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}

          {filterOptions.reasons.map((reason) => (
            <Badge key={reason} variant="secondary" className="gap-1">
              {reason}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter("reasons", reason)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
