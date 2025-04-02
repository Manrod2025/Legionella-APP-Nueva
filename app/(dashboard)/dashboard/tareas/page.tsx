import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import Link from "next/link"
import TareasList from "@/components/tareas-list"

export default async function TareasPage() {
  const supabase = createServerClient()

  // Obtener todas las tareas
  const { data: tareas } = await supabase.from("tareas").select(`
      *,
      operario:dni_operario(nombre, apellidos)
    `)

  // Obtener tareas realizadas
  const { data: realizadas } = await supabase
    .from("realiza")
    .select(`
      *,
      tarea:cod_tarea(nombre, periodicidad)
    `)
    .order("fecha", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
        <Link href="/dashboard/tareas/nueva">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="pendientes">
        <TabsList>
          <TabsTrigger value="pendientes">Tareas Pendientes</TabsTrigger>
          <TabsTrigger value="realizadas">Tareas Realizadas</TabsTrigger>
          <TabsTrigger value="todas">Todas las Tareas</TabsTrigger>
        </TabsList>
        <TabsContent value="pendientes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tareas Pendientes</CardTitle>
              <CardDescription>Tareas que deben realizarse próximamente</CardDescription>
            </CardHeader>
            <CardContent>
              <TareasList tareas={tareas || []} tipo="pendientes" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="realizadas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tareas Realizadas</CardTitle>
              <CardDescription>Historial de tareas completadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realizadas && realizadas.length > 0 ? (
                  realizadas.map((realizada) => (
                    <div
                      key={`${realizada.cod_tarea}-${realizada.nombre_punto}-${realizada.fecha}`}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{realizada.tarea?.nombre || realizada.cod_tarea}</h3>
                        <p className="text-sm text-gray-500">
                          {realizada.nombre_punto} - {realizada.nombre_espacio}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm font-medium">{new Date(realizada.fecha).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">
                          {realizada.temperatura && <span className="mr-2">Temp: {realizada.temperatura}°C</span>}
                          {realizada.cloro && <span className="mr-2">Cloro: {realizada.cloro}</span>}
                          {realizada.ph && <span>PH: {realizada.ph}</span>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No hay tareas realizadas registradas</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="todas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Todas las Tareas</CardTitle>
              <CardDescription>Listado completo de tareas</CardDescription>
            </CardHeader>
            <CardContent>
              <TareasList tareas={tareas || []} tipo="todas" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

