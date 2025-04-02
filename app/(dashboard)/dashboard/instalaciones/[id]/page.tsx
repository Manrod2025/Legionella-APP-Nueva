import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: {
    id: string
  }
}

export default async function InstalacionDetailPage({ params }: PageProps) {
  const supabase = createServerClient()

  // Obtener la instalación
  const { data: instalacion } = await supabase.from("instalacion").select("*").eq("cod_instalacion", params.id).single()

  if (!instalacion) {
    notFound()
  }

  // Obtener espacios de la instalación
  const { data: espacios } = await supabase.from("espacio").select("*").eq("cod_instalacion", params.id)

  // Obtener puntos de la instalación
  const { data: puntos } = await supabase
    .from("punto")
    .select(`
      *,
      espacio:nombre_espacio!inner(*)
    `)
    .eq("cod_instalacion", params.id)

  // Obtener tareas realizadas en la instalación
  const { data: tareas } = await supabase
    .from("realiza")
    .select(`
      *,
      tarea:cod_tarea(nombre)
    `)
    .eq("cod_instalacion", params.id)
    .order("fecha", { ascending: false })
    .limit(10)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{instalacion.nombre}</h1>
        <Link href="/dashboard/instalaciones">
          <Button variant="outline">Volver</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Información de la Instalación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500">Dirección</h3>
              <p className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {instalacion.direccion}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Teléfono</h3>
              <p className="flex items-center gap-1 mt-1">
                <Phone className="h-4 w-4" />
                {instalacion.telefono}
              </p>
            </div>
            {instalacion.observaciones && (
              <div className="col-span-2">
                <h3 className="font-medium text-gray-500">Observaciones</h3>
                <p className="mt-1">{instalacion.observaciones}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="espacios">
        <TabsList>
          <TabsTrigger value="espacios">Espacios</TabsTrigger>
          <TabsTrigger value="puntos">Puntos de Control</TabsTrigger>
          <TabsTrigger value="tareas">Tareas Realizadas</TabsTrigger>
        </TabsList>
        <TabsContent value="espacios" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Espacios</CardTitle>
              <CardDescription>Espacios registrados en esta instalación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {espacios?.map((espacio) => (
                  <Card key={espacio.nombre_espacio}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{espacio.nombre_espacio}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <span className="font-medium">Puntos:</span> {espacio.numero_puntos || 0}
                      </div>
                      {espacio.observaciones && (
                        <div className="text-sm mt-2">
                          <span className="font-medium">Observaciones:</span> {espacio.observaciones}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="puntos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Puntos de Control</CardTitle>
              <CardDescription>Puntos de agua registrados en esta instalación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {puntos?.map((punto) => (
                  <div
                    key={`${punto.nombre_punto}-${punto.nombre_espacio}`}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{punto.nombre_punto}</h3>
                      <p className="text-sm text-gray-500">{punto.espacio.nombre_espacio}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`px-2 py-1 rounded text-xs ${punto.tipo_agua === "AF" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}`}
                      >
                        {punto.tipo_agua === "AF" ? "Agua Fría" : "Agua Caliente"}
                      </div>
                      <div className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">{punto.tipo_grifo}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tareas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tareas Realizadas</CardTitle>
              <CardDescription>Últimas tareas realizadas en esta instalación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tareas?.map((tarea) => (
                  <div
                    key={`${tarea.cod_tarea}-${tarea.nombre_punto}-${tarea.fecha}`}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{tarea.tarea?.nombre || tarea.cod_tarea}</h3>
                      <p className="text-sm text-gray-500">
                        {tarea.nombre_punto} - {tarea.nombre_espacio}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm font-medium">{new Date(tarea.fecha).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">
                        {tarea.temperatura && <span className="mr-2">Temp: {tarea.temperatura}°C</span>}
                        {tarea.cloro && <span className="mr-2">Cloro: {tarea.cloro}</span>}
                        {tarea.ph && <span>PH: {tarea.ph}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

