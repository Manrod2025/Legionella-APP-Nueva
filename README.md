# Legionella-APP-Nueva

Aplicación web moderna para el control y gestión de Legionella, construida con Next.js, React y TypeScript.

## Tecnologías Principales
- Next.js 15.2.4
- React 19
- TypeScript
- Tailwind CSS
- Radix UI

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Accede a la aplicación en:
   ```
   http://localhost:3000
   ```

## Estructura del Proyecto
```
/
├── app/               # Rutas y páginas principales
├── components/        # Componentes reutilizables
├── hooks/             # Hooks personalizados
├── lib/               # Utilidades y funciones auxiliares
├── public/            # Archivos estáticos
├── styles/            # Estilos globales
├── types/             # Definiciones de TypeScript
├── next.config.mjs    # Configuración de Next.js
├── tailwind.config.ts # Configuración de Tailwind CSS
├── tsconfig.json      # Configuración de TypeScript
└── package.json       # Dependencias y scripts
```

## Scripts Disponibles
- `dev`: Inicia el servidor de desarrollo
- `build`: Compila el proyecto para producción
- `start`: Inicia el servidor en producción
- `lint`: Ejecuta el linter para verificar la calidad del código

## Dependencias Principales
- Radix UI: Componentes accesibles
- date-fns: Manejo de fechas
- react-hook-form: Manejo de formularios
- next-themes: Gestión de temas
- lucide-react: Iconos

## Contribución
1. Crea un nuevo branch:
   ```bash
   git checkout -b feature/nombre-de-la-funcionalidad
   ```

2. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```

3. Sube tus cambios:
   ```bash
   git push origin feature/nombre-de-la-funcionalidad
   ```

4. Crea un Pull Request para revisión.

## Licencia
[MIT](https://choosealicense.com/licenses/mit/)