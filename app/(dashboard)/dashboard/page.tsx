"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ClipboardList, Building2, Droplet } from "lucide-react"
import TareasRecientes from "@/components/tareas-recientes"
import EstadisticasCard from "@/components/estadisticas-card"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [tareas, setTareas] = useState([])
  const [instalaciones, setInstalaciones] = useState([])
  const [realizadas, setRealizadas] = useState([])
  const [stats, setStats] = useState({
    totalTareas: 0,
    totalInstalaciones: 0,
    totalPuntos: 0,
    tareasHoy: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos para el dashboard
        const { data: tareasData } = await supabase.from("tareas").select("*").limit(5)

        const { data: instalacionesData } = await supabase.from("instalacion").select("*").limit(5)

        const { data: realizadasData } = await supabase
          .from("realiza")
          .select("*")
          .order("fecha", { ascending: false })
          .limit(5)

        const { count: totalTareas } = await supabase.from("tareas").select("*", { count: "exact", head: true })

        const { count: totalInstalaciones } = await supabase
          .from("instalacion")
          .select("*", { count: "exact", head: true })

        const { count: totalPuntos } = await supabase.from("punto").select("*", { count: "exact", head: true })

        // Obtener tareas realizadas hoy
        const today = new Date().toISOString().split("T")[0]
        const { count: tareasHoy } = await supabase
          .from("realiza")
          .select("*", { count: "exact", head: true })
          .eq("fecha", today)

        setTareas(tareasData || [])
        setInstalaciones(instalacionesData || [])
        setRealizadas(realizadasData || [])
        setStats({
          totalTareas: totalTareas || 0,
          totalInstalaciones: totalInstalaciones || 0,
          totalPuntos: totalPuntos || 0,
          tareasHoy: tareasHoy || 0,
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-full">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panel de Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <EstadisticasCard
          title="Tareas Totales"
          value={stats.totalTareas}
          description="Total de tareas registradas"
          icon={<ClipboardList className="h-5 w-5 text-blue-600" />}
        />
        <EstadisticasCard
          title="Instalaciones"
          value={stats.totalInstalaciones}
          description="Instalaciones monitorizadas"
          icon={<Building2 className="h-5 w-5 text-green-600" />}
        />
        <EstadisticasCard
          title="Puntos de Control"
          value={stats.totalPuntos}
          description="Puntos de agua registrados"
          icon={<Droplet className="h-5 w-5 text-cyan-600" />}
        />
        <EstadisticasCard
          title="Tareas Hoy"
          value={stats.tareasHoy}
          description="Tareas realizadas hoy"
          icon={<CalendarDays className="h-5 w-5 text-purple-600" />}
        />
      </div>

      <Tabs defaultValue="recientes">
        <TabsList>
          <TabsTrigger value="recientes">Tareas Recientes</TabsTrigger>
          <TabsTrigger value="instalaciones">Instalaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="recientes" className="mt-4">
          <TareasRecientes tareas={tareas} realizadas={realizadas} />
        </TabsContent>
        <TabsContent value="instalaciones" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Instalaciones</CardTitle>
              <CardDescription>Lista de instalaciones monitorizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instalaciones.map((instalacion) => (
                  <div
                    key={instalacion.cod_instalacion}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{instalacion.nombre}</h3>
                      <p className="text-sm text-gray-500">{instalacion.direccion}</p>
                    </div>
                    <div className="text-sm text-gray-500">Tel: {instalacion.telefono}</div>
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

