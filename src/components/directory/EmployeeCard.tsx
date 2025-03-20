import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Mail, Calendar, Star, Phone, MapPin, Clock } from "lucide-react";

interface EmployeeCardProps {
  id?: string;
  name?: string;
  jobTitle?: string;
  department?: string;
  email?: string;
  phone?: string;
  location?: string;
  timeZone?: string;
  profileImage?: string;
  skills?: string[];
  isFavorite?: boolean;
  onViewProfile?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const EmployeeCard = ({
  id = "1",
  name = "Ahmed Al-Saud",
  jobTitle = "Senior Petroleum Engineer",
  department = "Upstream Operations",
  email = "ahmed.alsaud@aramco.com",
  phone = "+966 50 123 4567",
  location = "Dhahran, Saudi Arabia",
  timeZone = "AST (GMT+3)",
  profileImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
  skills = ["Reservoir Engineering", "Enhanced Oil Recovery", "Well Testing"],
  isFavorite = false,
  onViewProfile = () => {},
  onToggleFavorite = () => {},
}: EmployeeCardProps) => {
  return (
    <Card className="w-full max-w-[350px] overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage src={profileImage} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg truncate">{name}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {jobTitle}
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onToggleFavorite(id)}
                    >
                      <Star
                        className={
                          isFavorite
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-400"
                        }
                        size={18}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Badge variant="secondary" className="mt-2 mb-3">
              {department}
            </Badge>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-muted-foreground" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-muted-foreground" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-muted-foreground" />
                <span className="truncate">{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-muted-foreground" />
                <span>{timeZone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0 border-t bg-muted/10">
        <Button
          variant="outline"
          size="sm"
          className="w-[48%]"
          onClick={() => window.open(`mailto:${email}`)}
        >
          <Mail size={14} className="mr-1" />
          Message
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-[48%]"
          onClick={() => window.open(`calendar:${email}`)}
        >
          <Calendar size={14} className="mr-1" />
          Schedule
        </Button>
      </CardFooter>

      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => onViewProfile(id)}
      ></div>
    </Card>
  );
};

export default EmployeeCard;
