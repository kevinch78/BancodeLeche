# 💧 La Ruta de la Gotita

Aplicación web educativa interactiva desarrollada para el **Banco de Leche Humana del Hospital Universitario Departamental de Nariño (HUDN)**. 

El proyecto guía a madres, familias y personal de salud a través de un recorrido pedagógico gamificado que narra el viaje de amor, bioseguridad y solidaridad de la leche materna donada hasta llegar a los recién nacidos prematuros y hospitalizados.

---

## 🚀 Tecnologías Principales

- **Entorno y Bundler:** [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Gestor de Paquetes:** [pnpm](https://pnpm.io/)
- **Estilos y Dirección de Arte:** [Tailwind CSS](https://tailwindcss.com/) con paleta extendida de acuarelas pastel, tokens glassmorphism y fuentes *Fredoka* & *Nunito*.
- **Animaciones y Microinteracciones:** [Framer Motion](https://www.framer-motion.dev/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Calidad de Código:** ESLint + Prettier

---

## 🗺️ Estructura del Recorrido Gamificado

1. **Pantalla de Inicio (Portada):** Presentación inmersiva en formato horizontal (16:9) con botón de inicio interactivo.
2. **Mapa Interactivo:** Cartografía de la ruta por Nariño con coordenadas dinámicas en porcentaje y anclaje milimétrico de la mascota:
   - **0. Inicio:** El Jardín del Origen (Bajo el árbol protector).
   - **1. Estación:** La Gotita Curiosa *(Conceptos, objetivos y donación de leche materna)*.
   - **2. Estación:** La Gotita Viajera *(Cadena de frío y transporte seguro)*.
   - **3. Estación:** La Gotita Valiente *(Pasteurización Holder y control de calidad)*.
   - **4. Estación:** La Gotita Generosa *(El amor solidario de las mamás donantes)*.
   - **5. Meta:** Banco de Leche Humana • Hospital Universitario Departamental de Nariño.
3. **Control de Orientación (`OrientationGuard`):** Aviso dinámico que solicita utilizar el celular o tablet en modo horizontal para garantizar una experiencia óptima.
4. **Modo Calibración Debug:** Presionando la tecla **`D`** (o el botón *Debug* en el mapa), un clic en cualquier punto copia automáticamente las coordenadas `(x%, y%)` listas para ajustar paradas.

---

## 📂 Arquitectura de Carpetas

```text
src/
├── assets/
│   └── images/              # Assets exportados (cover-bg, map-bg, gotita, gotita-curiosa)
├── config/
│   └── routeData.ts         # Fuente única de verdad: coordenadas, textos, preguntas y trivias
├── types/
│   └── route.types.ts       # Tipos e interfaces de TypeScript
├── hooks/
│   └── useRouteProgress.ts  # Hook para control del estado de avance, historial y viaje
├── components/
│   ├── cover/
│   │   └── CoverScreen.tsx  # Pantalla de inicio a pantalla completa 16:9
│   ├── map/
│   │   ├── InteractiveMap.tsx   # Contenedor del mapa, barra superior y calibrador
│   │   ├── GotitaCharacter.tsx  # Mascota animada con Framer Motion
│   │   ├── StationHotspot.tsx   # Zonas interactivas sutiles sobre el sendero
│   │   └── StationModal.tsx     # Modal educativo dinámico
│   ├── stations/
│   │   └── StationOneView.tsx   # Vista temática estilo cuento de "La Gotita Curiosa"
│   └── ui/
│       ├── ActionButton.tsx     # Botón con variantes temáticas y microinteracciones
│       ├── ModalContainer.tsx   # Contenedor accesible con scroll independiente
│       ├── OrientationGuard.tsx # Detector y protector de orientación horizontal
│       └── ProgressBadge.tsx    # Indicador de progreso dinámico
├── App.tsx                  # Orquestador principal de vistas
├── index.css                # Tokens CSS de la dirección de arte y fuentes
└── main.tsx                 # Entrada de la aplicación
```

---

## 🛠️ Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/banco_leche.git
   cd banco_leche
   ```

2. **Instalar dependencias con `pnpm`:**
   ```bash
   pnpm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

4. **Compilar para producción:**
   ```bash
   pnpm build
   ```

5. **Verificar linter y formato:**
   ```bash
   pnpm lint
   pnpm format
   ```

---

## 🏥 Hospital Universitario Departamental de Nariño
*Banco de Leche Humana — Promoviendo, protegiendo y apoyando la lactancia materna.*
