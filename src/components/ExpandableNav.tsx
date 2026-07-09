import { useState } from "react";
import { 
  User, 
  CircleFadingArrowUp, 
  FolderKanban, 
  BookOpen, 
  LogOut, 
  ChevronRight,
  House,
  Bell,
  Settings2,
  ShieldAlert,
  FileText,
  MessageSquare,
  Lock,
  Globe,
  Cpu,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "dashboard" | "notifications" | "settings" | "docs" | "alerts" | null;

const TAB_CONTENT = {
  dashboard: [
    { icon: User, label: "profile" },
    { icon: CircleFadingArrowUp, label: "upgrade" },
    { icon: FolderKanban, label: "projects" },
    { icon: BookOpen, label: "documentation" },
    { icon: LogOut, label: "logout" },
  ],
  notifications: [
    { icon: Bell, label: "all notifications" },
    { icon: MessageSquare, label: "mentions" },
    { icon: Heart, label: "likes & reactions" },
  ],
  settings: [
    { icon: User, label: "account" },
    { icon: Lock, label: "privacy & security" },
    { icon: Globe, label: "language" },
    { icon: Settings2, label: "preferences" },
    { icon: LogOut, label: "sign out" },
  ],
  docs: [
    { icon: BookOpen, label: "getting started" },
    { icon: FileText, label: "api reference" },
    { icon: MessageSquare, label: "community" },
  ],
  alerts: [
    { icon: Cpu, label: "system status" },
    { icon: ShieldAlert, label: "security alerts" },
  ],
};

const BOTTOM_TABS = [
  { id: "dashboard", icon: House, label: "Dashboard" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "settings", icon: Settings2, label: "Settings" },
  { id: "docs", icon: BookOpen, label: "Docs" },
  { id: "alerts", icon: ShieldAlert, label: "Alerts" },
];

export interface ExpandableNavProps {
  /** Height of each item in the expanded menu (in px) */
  itemHeight?: number;
  /** Size of icons (in px) */
  iconSize?: number;
  /** Tailwind text size class for all text */
  textSize?: string;
  /** Gap between items in the expanded menu (in px) */
  gap?: number;
  /** Height of the bottom bar container (in px) */
  bottomBarHeight?: number;
  /** Width of the component */
  containerWidth?: number | string;
}

export function ExpandableNav({
  itemHeight = 48, 
  iconSize = 20, 
  textSize = "text-base", 
  gap = 6, 
  bottomBarHeight = 64, 
  containerWidth = 360, 
}: ExpandableNavProps) {
  const [activeTab, setActiveTab] = useState<Tab>(null);

  const isExpanded = activeTab !== null;
  const activeItems = activeTab ? TAB_CONTENT[activeTab] : [];
  
  const topPadding = 12;
  const bottomSpace = bottomBarHeight + 12; 
  const totalItemsHeight = activeItems.length * itemHeight;
  const totalGapHeight = Math.max(0, activeItems.length - 1) * gap;
  
  const expandedHeight = isExpanded 
    ? `${topPadding + totalItemsHeight + totalGapHeight + bottomSpace}px` 
    : `${bottomBarHeight}px`;

  // Premium transition curve (easeOutQuint)
  const premiumTransition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)";

  return (
    <div 
      className="bg-background relative mx-auto overflow-visible rounded-[2rem] border border-border shadow-2xl" 
      style={{ 
        height: expandedHeight, 
        width: containerWidth,
        transition: premiumTransition
      }}
    >
      <div 
        className="bg-background/80 absolute inset-x-0 top-0 overflow-hidden rounded-[2rem]"
        style={{ 
          opacity: isExpanded ? 1 : 0, 
          transform: isExpanded ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
          pointerEvents: isExpanded ? "auto" : "none",
          transition: premiumTransition,
          paddingTop: topPadding,
          paddingBottom: bottomSpace,
          paddingLeft: 12,
          paddingRight: 12
        }}
      >
        <div className="flex flex-col" style={{ gap }}>
          {activeItems.map((item, index) => (
            <div 
              key={index} 
              className="hover:bg-muted cursor-pointer flex items-center justify-between rounded-2xl px-3 font-medium transition-colors"
              style={{ height: itemHeight }}
            > 
              <span className={cn("flex items-center justify-center gap-3 capitalize", textSize)}>
                <item.icon style={{ width: iconSize, height: iconSize }} /> 
                {item.label}
              </span>
              <span className="text-muted-foreground">
                <ChevronRight style={{ width: iconSize, height: iconSize }} />
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div 
        className="bg-background absolute bottom-0 w-full z-10 border-t border-border/50 rounded-b-[2rem]"
        style={{ height: bottomBarHeight, padding: 8 }}
      >
        <div className="flex h-full w-full items-center justify-center gap-1.5">
          {BOTTOM_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div key={tab.id} className="relative group flex h-full">
                <button 
                  onClick={() => setActiveTab(isActive ? null : tab.id as Tab)}
                  className={cn(
                    "relative flex h-full items-center justify-center rounded-2xl font-medium",
                    isActive 
                      ? "bg-foreground/10 text-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  style={{ 
                    gap: isActive ? "0.75rem" : "0rem", 
                    paddingLeft: isActive ? "1.25rem" : "0.75rem", 
                    paddingRight: isActive ? "1.25rem" : "0.75rem",
                    transition: premiumTransition 
                  }}
                >
                  <tab.icon style={{ width: iconSize, height: iconSize, transition: premiumTransition }} className="fill-current shrink-0" />
                  <span 
                    className={cn("overflow-hidden whitespace-nowrap tracking-tight", textSize)} 
                    style={{ 
                      maxWidth: isActive ? "120px" : "0px", 
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(-4px)",
                      transition: premiumTransition 
                    }}
                  >
                    {tab.label}
                  </span>
                </button>

                {/* Premium Tooltip */}
                {!isActive && (
                  <div 
                    className={cn(
                      "absolute -top-14 left-1/2 px-4 py-2 bg-foreground text-background font-semibold rounded-xl pointer-events-none z-[100]",
                      "transition-all duration-300 ease-out",
                      "opacity-0 translate-y-3 -translate-x-1/2 scale-90",
                      "group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100",
                      textSize
                    )}
                  >
                    {tab.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
