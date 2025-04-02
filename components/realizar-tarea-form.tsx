"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Tarea } from "@/types"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Punto {
  nombre_punto: string
  nombre_espacio: string
  cod_instalacion: string
  tipo_agua: "AF" | "AC"
  tipo_grifo: string
  espacio: {
    nombre_espacio: string
    instalacion: {
      nombre: string
    }
  }
}

interface RealizarTareaFormProps {
  tarea: Tarea
  puntos: Punto[]
}

export default function RealizarTareaForm({ tarea, puntos }: RealizarTareaFormProps) {
  const [selectedPunto, setSelectedPunto] = useState("")
  const [temperatura, setTemperatura] = useState("")
  const [cloro, setCloro] = useState("")
  const [ph, setPh] = useState("")
  const [turbidez, setTurbidez] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validar datos
      if (!selectedPunto) {
        throw new Error("Debes seleccionar un punto")
      }

      // Obtener información del punto seleccionado
      const punto = puntos.find((p) => `${p.nombre_punto}-${p.nombre_espacio}-${p.cod_instalacion}` === selectedPunto)

      if (!punto) {
        throw new Error("Punto no encontrado")
      }

      // Crear registro de tarea realizada
      const { error: insertError } = await supabase.from("realiza").insert({
        cod_tarea: tarea.cod_tarea,
        nombre_punto: punto.nombre_punto,
        nombre_espacio: punto.nombre_espacio,
        cod_instalacion: punto.cod_instalacion,
        fecha: new Date().toISOString().split("T")[0],
        hora: new Date().toTimeString().split(" ")[0],
        temperatura: temperatura ? Number.parseInt(temperatura) : null,
        cloro: cloro ? Number.parseFloat(cloro) : null,
        ph: ph ? Number.parseInt(ph) : null,
        turbidez: turbidez ? Number.parseFloat(turbidez) : null,
      })

      if (insertError) {
        throw new Error(insertError.message)
      }

      // Redirigir a la página de tareas
      router.push("/dashboard/tareas")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar la tarea")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="punto">Punto de Control</Label>
        <Select value={selectedPunto} onValueChange={setSelectedPunto} required>
          <SelectTrigger id="punto">
            <SelectValue placeholder="Selecciona un punto" />
          </SelectTrigger>
          <SelectContent>
            {puntos.map((punto) => (
              <SelectItem
                key={`${punto.nombre_punto}-${punto.nombre_espacio}-${punto.cod_instalacion}`}
                value={`${punto.nombre_punto}-${punto.nombre_espacio}-${punto.cod_instalacion}`}
              >
                {punto.nombre_punto} - {punto.espacio.nombre_espacio} ({punto.espacio.instalacion.nombre})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="temperatura">Temperatura (°C)</Label>
          <Input
            id="temperatura"
            type="number"
            value={temperatura}
            onChange={(e) => setTemperatura(e.target.value)}
            placeholder="Ej: 25"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cloro">Cloro (ppm)</Label>
          <Input
            id="cloro"
            type="number"
            step="0.1"
            value={cloro}
            onChange={(e) => setCloro(e.target.value)}
            placeholder="Ej: 1.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ph">PH</Label>
          <Input id="ph" type="number" value={ph} onChange={(e) => setPh(e.target.value)} placeholder="Ej: 7" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="turbidez">Turbidez (NTU)</Label>
          <Input
            id="turbidez"
            type="number"
            step="0.1"
            value={turbidez}
            onChange={(e) => setTurbidez(e.target.value)}
            placeholder="Ej: 0.5"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Registrando..." : "Registrar Tarea"}
      </Button>
    </form>
  )
}

