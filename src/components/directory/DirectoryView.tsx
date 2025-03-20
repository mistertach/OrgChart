import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import EmployeeGrid from "./EmployeeGrid";
import { Button } from "../ui/button";
import { Filter, Grid, List } from "lucide-react";

interface DirectoryViewProps {
  onViewProfile?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isLoading?: boolean;
}

const DirectoryView = ({
  onViewProfile = () => {},
  onToggleFavorite = () => {},
  isLoading = false,
}: DirectoryViewProps) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    departments: [],
    skills: [],
    locations: [],
    reportingLines: [],
  });

  // Filter employees based on selected filters
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-full w-full bg-background">
      {/* Filter sidebar with toggle functionality */}
      <div
        className={`transition-all duration-300 ${showSidebar ? "w-[300px]" : "w-0"} overflow-hidden`}
      >
        {showSidebar && <FilterSidebar onFilterChange={handleFilterChange} />}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Toolbar */}
        <div className="h-14 border-b flex items-center px-4 justify-between bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label={showSidebar ? "Hide filters" : "Show filters"}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Employee grid */}
        <div className="flex-1 overflow-hidden">
          <EmployeeGrid
            onViewProfile={onViewProfile}
            onToggleFavorite={onToggleFavorite}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DirectoryView;
