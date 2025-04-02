import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Tarea, Realiza } from "@/types"

interface TareasRecientesProps {
  tareas: Tarea[]
  realizadas: Realiza[]
}

export default function TareasRecientes({ tareas, realizadas }: TareasRecientesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas Recientes</CardTitle>
        <CardDescription>Últimas tareas realizadas en el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {realizadas.length > 0 ? (
            realizadas.map((realizada) => {
              const tarea = tareas.find((t) => t.cod_tarea === realizada.cod_tarea)
              return (
                <div
                  key={`${realizada.cod_tarea}-${realizada.nombre_punto}-${realizada.fecha}`}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{tarea?.nombre || realizada.cod_tarea}</h3>
                    <p className="text-sm text-gray-500">
                      {realizada.nombre_punto} - {realizada.nombre_espacio}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline">{new Date(realizada.fecha).toLocaleDateString()}</Badge>
                    <div className="text-sm">
                      {realizada.temperatura && <span className="mr-2">Temp: {realizada.temperatura}°C</span>}
                      {realizada.cloro && <span className="mr-2">Cloro: {realizada.cloro}</span>}
                      {realizada.ph && <span>PH: {realizada.ph}</span>}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-center text-gray-500 py-4">No hay tareas recientes registradas</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

