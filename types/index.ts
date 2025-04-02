export interface Operario {
  dni_operario: string
  nombre: string
  apellidos: string
  fecha_nac?: string
  telefono: string
  poblacion?: string
  cif_empresa?: string
  cod_instalacion?: string
  observaciones?: string
  contraseña: string
  mail: string
}

export interface Instalacion {
  cod_instalacion: string
  nombre: string
  direccion: string
  telefono: string
  cif_propietario?: string
  observaciones?: string
}

export interface Espacio {
  nombre_espacio: string
  cod_instalacion: string
  numero_puntos?: string
  observaciones?: string
}

export interface Punto {
  nombre_punto: string
  nombre_espacio: string
  cod_instalacion: string
  tipo_agua: "AF" | "AC"
  tipo_grifo: "Temporizador" | "Monomando" | "Llave"
  observaciones?: string
}

export interface Tarea {
  cod_tarea: string
  nombre: string
  periodicidad: string
  dni_operario?: string
}

export interface Realiza {
  cod_tarea: string
  nombre_punto: string
  nombre_espacio: string
  cod_instalacion: string
  fecha: string
  hora: string
  temperatura?: number
  cloro?: number
  ph?: number
  turbidez?: number
}

