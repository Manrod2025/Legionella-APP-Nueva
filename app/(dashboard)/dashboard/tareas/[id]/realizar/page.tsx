import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RealizarTareaForm from "@/components/realizar-tarea-form"

interface PageProps {
  params: {
    id: string
  }
}

export default async function RealizarTareaPage({ params }: PageProps) {
  const supabase = createServerClient()

  // Obtener la tarea
  const { data: tarea } = await supabase.from("tareas").select("*").eq("cod_tarea", params.id).single()

  if (!tarea) {
    notFound()
  }

  // Obtener puntos disponibles
  const { data: puntos } = await supabase.from("punto").select(`
      *,
      espacio:nombre_espacio!inner(
        *,
        instalacion:cod_instalacion!inner(*)
      )
    `)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Realizar Tarea: {tarea.nombre}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Formulario de Registro</CardTitle>
          <CardDescription>Completa los datos para registrar la tarea</CardDescription>
        </CardHeader>
        <CardContent>
          <RealizarTareaForm tarea={tarea} puntos={puntos || []} />
        </CardContent>
      </Card>
    </div>
  )
}

