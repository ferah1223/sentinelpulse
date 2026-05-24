"use client";

import {
  Shield,
  TrendingUp,
  Activity,
  AlertTriangle,
  FileText,
  Cpu,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { section: "Overview", items: [{ label: "Dashboard", href: "/", icon: Shield }] },
  {
    section: "Monitors",
    items: [
      { label: "TVL Monitor", href: "/tvl", icon: TrendingUp },
      { label: "Whale Watch", href: "/whales", icon: Activity },
      { label: "Anomalies", href: "/anomalies", icon: AlertTriangle },
    ],
  },
  {
    section: "Intelligence",
    items: [
      { label: "Reports", href: "/reports", icon: FileText },
      { label: "Agent Logs", href: "/agents", icon: Cpu },
    ],
  },
  { section: "Settings", items: [{ label: "Settings", href: "/settings", icon: Settings }] },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col w-56 bg-surface-deep border-r border-surface-panel h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-surface-panel">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sentinel-green to-sentinel-cyan flex items-center justify-center">
            <Shield className="w-4 h-4 text-surface-void" />
          </div>
          <div>
            <div className="text-sm font-bold text-text-primary tracking-tight">
              SentinelPulse
            </div>
            <div className="text-[10px] text-text-muted font-mono">
              MiMo V2.5
            </div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navItems.map((section) => (
          <div key={section.section}>
            <div className="text-[10px] font-semibold text-text-muted uppercase tracking-widest px-2 mb-2">
              {section.section}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all",
                      isActive
                        ? "bg-sentinel-green/10 text-sentinel-green border border-sentinel-green/20"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-panel"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-surface-panel">
        <div className="text-[10px] text-text-muted text-center">
          Powered by{" "}
          <span className="text-sentinel-green font-semibold">Xiaomi MiMo V2.5</span>
        </div>
      </div>
    </nav>
  );
}
