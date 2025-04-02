import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"
import Link from "next/link"

interface Tarea {
  cod_tarea: string
  nombre: string
  periodicidad: string
  dni_operario?: string
  operario?: {
    nombre: string
    apellidos: string
  }
}

interface TareasListProps {
  tareas: Tarea[]
  tipo: "pendientes" | "todas"
}

export default function TareasList({ tareas, tipo }: TareasListProps) {
  if (!tareas.length) {
    return <p className="text-tareas, tipo}: TareasListProps) {
  if (!tareas.length) {
    return <p className=\"text-center text-gray-500 py-4">No hay tareas registradas</p>
  }

  return (
    <div className="space-y-4">
      {tareas.map((tarea) => (
        <div key={tarea.cod_tarea} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">{tarea.nombre}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={tarea.periodicidad === 'diaria' ? 'default' : 'secondary'}>
                {tarea.periodicidad}
              </Badge>
              {tarea.operario && (
                <div className="flex items-center text-xs text-gray-500">
                  <User className="h-3 w-3 mr-1" />
                  {tarea.operario.nombre} {tarea.operario.apellidos}
                </div>
              )}
            </div>
          </div>
          <Link href={`/dashboard/tareas/${tarea.cod_tarea}/realizar`}>
            <Button variant="outline" size="sm">
              Realizar
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

