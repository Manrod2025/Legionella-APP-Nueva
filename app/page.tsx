"use client"

import { useRouter } from "next/navigation"
import LoginForm from "@/components/login-form"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  const handleDirectAccess = () => {
    // Crear un operario predeterminado
    const defaultOperario = {
      dni_operario: "45678912K",
      nombre: "Maria Helena",
      apellidos: "Gómez Sánchez",
      telefono: "654789123",
      mail: "mariahelena@ejemplo.com",
      contraseña: "MHelen@2021",
    }

    // Guardar en localStorage
    localStorage.setItem("operario", JSON.stringify(defaultOperario))

    // Redirigir al dashboard
    router.push("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Control de Legionella</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Inicia sesión para gestionar las tareas de control y prevención
          </p>
        </div>
        <LoginForm />

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={handleDirectAccess}
            className="w-full bg-green-100 text-green-700 hover:bg-green-200 border-green-300"
          >
            Acceso Directo (Sin Login)
          </Button>
          <p className="text-xs text-gray-500 mt-2">Este botón es temporal para pruebas</p>
        </div>
      </div>
    </main>
  )
}

