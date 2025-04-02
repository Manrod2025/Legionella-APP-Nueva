import { createServerClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default async function InstalacionesPage() {
  const supabase = createServerClient()

  // Obtener todas las instalaciones
  const { data: instalaciones } = await supabase.from("instalacion").select(`
      *,
      espacios:espacio(*)
    `)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Instalaciones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instalaciones?.map((instalacion) => (
          <Link key={instalacion.cod_instalacion} href={`/dashboard/instalaciones/${instalacion.cod_instalacion}`}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  {instalacion.nombre}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {instalacion.direccion}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                  <Phone className="h-3 w-3" />
                  {instalacion.telefono}
                </div>
                <div className="text-sm">
                  <span className="font-medium">{instalacion.espacios?.length || 0}</span> espacios
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

