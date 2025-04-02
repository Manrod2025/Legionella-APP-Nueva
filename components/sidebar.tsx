"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ClipboardList, Building2, Users, Droplet, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Eliminar operario de localStorage
    localStorage.removeItem("operario")
    router.push("/")
    router.refresh()
  }

  const links = [
    { href: "/dashboard", label: "Inicio", icon: Home },
    { href: "/dashboard/tareas", label: "Tareas", icon: ClipboardList },
    { href: "/dashboard/instalaciones", label: "Instalaciones", icon: Building2 },
    { href: "/dashboard/operarios", label: "Operarios", icon: Users },
    { href: "/dashboard/puntos", label: "Puntos de control", icon: Droplet },
    { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
  ]

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Control Legionella</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400",
                pathname === link.href && "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400",
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-700"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}

