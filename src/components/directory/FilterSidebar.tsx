import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSidebarProps {
  onFilterChange?: (filters: {
    departments: string[];
    skills: string[];
    locations: string[];
    reportingLines: string[];
  }) => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps = {}) => {
  const [departments, setDepartments] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [reportingLines, setReportingLines] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for filter options
  const departmentOptions: FilterOption[] = [
    { id: "upstream", label: "Upstream Operations" },
    { id: "downstream", label: "Downstream Operations" },
    { id: "drilling", label: "Drilling Operations" },
    { id: "production", label: "Production Operations" },
    { id: "exploration", label: "Exploration" },
    { id: "projects", label: "Projects & Engineering" },
    { id: "hse", label: "HSE" },
    { id: "digital", label: "Digital Transformation" },
    { id: "executive", label: "Executive Leadership" },
    { id: "finance", label: "Finance" },
    { id: "hr", label: "Human Resources" },
  ];

  const skillOptions: FilterOption[] = [
    { id: "reservoir", label: "Reservoir Engineering" },
    { id: "drilling", label: "Drilling Optimization" },
    { id: "production", label: "Production Optimization" },
    { id: "geology", label: "Geology" },
    { id: "seismic", label: "Seismic Interpretation" },
    { id: "process", label: "Process Engineering" },
    { id: "project", label: "Project Management" },
    { id: "eor", label: "Enhanced Oil Recovery" },
    { id: "petrel", label: "Petrel" },
    { id: "eclipse", label: "Eclipse" },
    { id: "data", label: "Data Science" },
    { id: "sustainability", label: "Sustainability" },
  ];

  const locationOptions: FilterOption[] = [
    { id: "dhahran", label: "Dhahran" },
    { id: "riyadh", label: "Riyadh" },
    { id: "jeddah", label: "Jeddah" },
    { id: "dammam", label: "Dammam" },
    { id: "jubail", label: "Jubail" },
    { id: "yanbu", label: "Yanbu" },
    { id: "abqaiq", label: "Abqaiq" },
    { id: "international", label: "International" },
  ];

  const reportingLineOptions: FilterOption[] = [
    { id: "ceo", label: "CEO" },
    { id: "coo", label: "COO" },
    { id: "cfo", label: "CFO" },
    { id: "vp-upstream", label: "VP Upstream" },
    { id: "vp-downstream", label: "VP Downstream" },
    { id: "vp-exploration", label: "VP Exploration" },
    { id: "vp-drilling", label: "VP Drilling" },
    { id: "vp-projects", label: "VP Projects" },
    { id: "vp-digital", label: "VP Digital Transformation" },
  ];

  const handleToggleFilter = (
    id: string,
    currentFilters: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const newFilters = currentFilters.includes(id)
      ? currentFilters.filter((item) => item !== id)
      : [...currentFilters, id];

    setFilter(newFilters);

    if (onFilterChange) {
      onFilterChange({
        departments: id.startsWith("department-") ? newFilters : departments,
        skills: id.startsWith("skill-") ? newFilters : skills,
        locations: id.startsWith("location-") ? newFilters : locations,
        reportingLines: id.startsWith("reporting-")
          ? newFilters
          : reportingLines,
      });
    }
  };

  const clearAllFilters = () => {
    setDepartments([]);
    setSkills([]);
    setLocations([]);
    setReportingLines([]);
    setSearchTerm("");

    if (onFilterChange) {
      onFilterChange({
        departments: [],
        skills: [],
        locations: [],
        reportingLines: [],
      });
    }
  };

  const totalFiltersApplied =
    departments.length +
    skills.length +
    locations.length +
    reportingLines.length;

  return (
    <div className="w-full h-full max-w-[300px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        {totalFiltersApplied > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs h-8"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search filters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2 top-2.5"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {totalFiltersApplied > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {departments.map((id) => {
            const option = departmentOptions.find((opt) => opt.id === id);
            return option ? (
              <Badge key={id} variant="secondary" className="px-2 py-1">
                {option.label}
                <button
                  onClick={() =>
                    handleToggleFilter(id, departments, setDepartments)
                  }
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          {skills.map((id) => {
            const option = skillOptions.find((opt) => opt.id === id);
            return option ? (
              <Badge key={id} variant="secondary" className="px-2 py-1">
                {option.label}
                <button
                  onClick={() => handleToggleFilter(id, skills, setSkills)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          {locations.map((id) => {
            const option = locationOptions.find((opt) => opt.id === id);
            return option ? (
              <Badge key={id} variant="secondary" className="px-2 py-1">
                {option.label}
                <button
                  onClick={() =>
                    handleToggleFilter(id, locations, setLocations)
                  }
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          {reportingLines.map((id) => {
            const option = reportingLineOptions.find((opt) => opt.id === id);
            return option ? (
              <Badge key={id} variant="secondary" className="px-2 py-1">
                {option.label}
                <button
                  onClick={() =>
                    handleToggleFilter(id, reportingLines, setReportingLines)
                  }
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
        </div>
      )}

      <Accordion
        type="multiple"
        defaultValue={["departments", "skills", "locations", "reporting"]}
        className="space-y-2"
      >
        <AccordionItem value="departments" className="border-b">
          <AccordionTrigger className="py-3">Departments</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {departmentOptions
                .filter(
                  (option) =>
                    searchTerm === "" ||
                    option.label
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                )
                .map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`department-${option.id}`}
                      checked={departments.includes(option.id)}
                      onCheckedChange={() =>
                        handleToggleFilter(
                          option.id,
                          departments,
                          setDepartments,
                        )
                      }
                    />
                    <label
                      htmlFor={`department-${option.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border-b">
          <AccordionTrigger className="py-3">Skills</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {skillOptions
                .filter(
                  (option) =>
                    searchTerm === "" ||
                    option.label
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                )
                .map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${option.id}`}
                      checked={skills.includes(option.id)}
                      onCheckedChange={() =>
                        handleToggleFilter(option.id, skills, setSkills)
                      }
                    />
                    <label
                      htmlFor={`skill-${option.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="locations" className="border-b">
          <AccordionTrigger className="py-3">Locations</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {locationOptions
                .filter(
                  (option) =>
                    searchTerm === "" ||
                    option.label
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                )
                .map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${option.id}`}
                      checked={locations.includes(option.id)}
                      onCheckedChange={() =>
                        handleToggleFilter(option.id, locations, setLocations)
                      }
                    />
                    <label
                      htmlFor={`location-${option.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reporting" className="border-b">
          <AccordionTrigger className="py-3">Reporting Lines</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {reportingLineOptions
                .filter(
                  (option) =>
                    searchTerm === "" ||
                    option.label
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                )
                .map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`reporting-${option.id}`}
                      checked={reportingLines.includes(option.id)}
                      onCheckedChange={() =>
                        handleToggleFilter(
                          option.id,
                          reportingLines,
                          setReportingLines,
                        )
                      }
                    />
                    <label
                      htmlFor={`reporting-${option.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
