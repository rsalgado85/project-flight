# MISION

Actúa como un equipo multidisciplinario de élite compuesto por los mejores ingenieros de Google, Apple, Tesla, SpaceX, Vercel, FlightRadar24, FlightAware, Mapbox, Uber, Airbnb, Palantir, ArcGIS, NASA, Boeing y OpenSky.

Tu objetivo es diseñar y desarrollar una plataforma web de inteligencia aeronáutica completamente Frontend, profesional, modular, altamente optimizada y lista para producción, capaz de ejecutarse y desplegarse directamente en Vercel sin necesidad de backend propio.

No generes un ejemplo ni un MVP. Diseña una aplicación de calidad Enterprise.

--------------------------------------------------

## ROLES

Trabaja simultáneamente como:

• Principal Software Architect
• Enterprise Frontend Architect
• Senior React Engineer
• Senior TypeScript Engineer
• Senior Next.js Engineer
• Senior Vite Engineer
• GIS Engineer
• Aviation Systems Engineer
• ADS-B Specialist
• Flight Data Engineer
• Data Visualization Expert
• Dashboard UX Expert
• UI Designer
• UX Designer
• Motion Designer
• Product Manager
• Technical Product Owner
• Cloud Architect
• OpenStreetMap Specialist
• MapLibre Expert
• Leaflet Expert
• Mapbox Expert
• REST API Expert
• Performance Engineer
• Accessibility Expert
• SEO Expert
• PWA Expert
• Open Source Maintainer
• Cybersecurity Consultant
• DevOps Consultant
• Clean Code Expert
• SOLID Expert
• Clean Architecture Expert
• Atomic Design Expert

--------------------------------------------------

## OBJETIVO

Construir la mejor plataforma gratuita de monitoreo aéreo en tiempo real.

Debe superar visualmente a FlightRadar24.

Debe parecer un producto comercial SaaS.

Debe ser completamente responsive.

Debe poder desplegarse directamente en:

• Vercel

Sin Backend.

Sin Base de Datos.

Sin funciones serverless.

Toda la información debe consumirse desde APIs públicas gratuitas.

--------------------------------------------------

## PRINCIPIO FUNDAMENTAL

NO depender de una sola API.

Crear una capa inteligente de agregación de datos.

Fusionar automáticamente información proveniente de múltiples APIs.

Normalizar los datos.

Eliminar duplicados.

Resolver inconsistencias.

Mantener un modelo de datos unificado.

Si una API falla:

hacer Failover automático.

Si una API no devuelve un dato:

buscarlo en otra.

Toda esta lógica debe ser transparente para el usuario.

--------------------------------------------------

## APIs A UTILIZAR

### Tracking de aeronaves

✔ OpenSky Network (principal)

✔ ADSB.lol (respaldo)

✔ ADS-B Exchange (cuando exista acceso gratuito)

--------------------------------------------------

### Información de aeropuertos

OurAirports

AirportDB

OpenFlights

--------------------------------------------------

### Información meteorológica

Open-Meteo

NOAA

METAR

TAF

--------------------------------------------------

### Información geográfica

OpenStreetMap

Natural Earth

GeoJSON World

GeoBoundaries

--------------------------------------------------

### Información de países

REST Countries

--------------------------------------------------

### Zonas horarias

WorldTimeAPI

--------------------------------------------------

### Información de aeronaves

OpenSky Aircraft Database

OurAirports Aircraft

Wikipedia APIs

--------------------------------------------------

### Logos

Clearbit

SimpleIcons

Airhex

--------------------------------------------------

### Banderas

FlagCDN

--------------------------------------------------

### Conversión de unidades

Automática.

Pies

Metros

Millas

Kilómetros

Nudos

Km/h

MPH

--------------------------------------------------

## STACK

React 19

TypeScript

Vite

TailwindCSS

React Router

TanStack Query

React Leaflet

Leaflet

MapLibre GL

Motion

Zustand

Chart.js

Recharts

Fuse.js

DayJS

React Hook Form

Lucide Icons

React Virtual

ESLint

Prettier

Vitest

--------------------------------------------------

## DISEÑO

Inspiración:

FlightRadar24

RadarBox

Google Earth

Google Maps

Apple Maps

Windy

Tesla

Linear

ArcGIS

Vercel

Notion

Mantener una identidad propia.

--------------------------------------------------

## EXPERIENCIA

Animaciones suaves.

Transiciones fluidas.

Modo oscuro.

Modo claro.

Glassmorphism.

Neumorphism ligero.

Microinteracciones.

--------------------------------------------------

## MAPA

Mapa Full Screen.

Capas:

OpenStreetMap

Dark

Satellite

Terrain

Topographic

Ocean

Weather

Wind

Clouds

Rain

--------------------------------------------------

Mostrar

Aviones

Aeropuertos

Helipuertos

Runways

Rutas

Heatmaps

Clusters

Trails

Animaciones.

--------------------------------------------------

## DATOS DEL AVIÓN

Mostrar absolutamente toda la información posible.

ICAO24

Callsign

Flight Number

Registration

Aircraft Type

Aircraft Category

Manufacturer

Model

Serial Number

Operator

Airline

Country

Origin

Destination

Departure Airport

Arrival Airport

Current Position

Latitude

Longitude

Altitude

Ground Altitude

Barometric Altitude

Geo Altitude

Vertical Speed

Ground Speed

Heading

Track

Squawk

Last Contact

On Ground

Distance Remaining

Estimated Arrival

Estimated Departure

Aircraft Age

Engine Count

Engine Type

Capacity

Maximum Range

Cruise Speed

Wingspan

Length

Weight

Seat Capacity

Cargo Capacity

Photo

Livery

Airline Logo

Country Flag

--------------------------------------------------

## INFORMACIÓN DEL VUELO

Origen

Destino

Duración

Estado

Retrasos

Ruta

Distancia

Tiempo restante

Altitud máxima

Velocidad promedio

Historial

Replay

--------------------------------------------------

## INFORMACIÓN DEL AEROPUERTO

Nombre

ICAO

IATA

Ciudad

País

Elevación

Coordenadas

Terminales

Pistas

Longitud de pistas

Orientación

Frecuencias

Salidas

Llegadas

Mapa del aeropuerto

Clima

METAR

TAF

Hora local

Zona horaria

--------------------------------------------------

## DASHBOARD

Crear panel ejecutivo.

Widgets:

Total vuelos

En vuelo

En tierra

Por continente

Por país

Por aerolínea

Por fabricante

Por modelo

Por tipo

Por velocidad

Por altitud

Emergencias (Squawk)

Gráficos:

Line

Bar

Pie

Treemap

Radar

Heatmap

Scatter

Timeline

--------------------------------------------------

## BUSCADOR

Buscar por:

Vuelo

ICAO24

Callsign

Aerolínea

Aeropuerto

País

Fabricante

Modelo

Registro

--------------------------------------------------

## FILTROS

Todos los filtros posibles.

--------------------------------------------------

## IA

Crear una capa inteligente.

Resumir automáticamente un vuelo.

Explicar qué hace cada avión.

Explicar el modelo del avión.

Mostrar curiosidades.

Responder preguntas en lenguaje natural.

Ejemplos:

"Muéstrame los vuelos de Madrid a Santo Domingo"

"Aviones Boeing sobre Europa"

"Todos los Airbus A350"

--------------------------------------------------

## FAVORITOS

Guardar:

Vuelos

Aeropuertos

Aerolíneas

Aviones

Usar LocalStorage.

--------------------------------------------------

## EXPORTACIONES

PNG

CSV

JSON

PDF

--------------------------------------------------

## OPTIMIZACIÓN

Lazy Loading

Tree Shaking

Memo

Suspense

Virtualización

Code Splitting

Caching

Retry

Prefetch

Offline Cache

--------------------------------------------------

## PWA

Instalable.

Offline.

Responsive.

--------------------------------------------------

## SEO

Meta Tags

OpenGraph

Twitter Cards

Structured Data

Sitemap

Robots

--------------------------------------------------

## ACCESIBILIDAD

WCAG AA

ARIA

Keyboard Navigation

--------------------------------------------------

## CALIDAD

100% TypeScript

Sin warnings

Sin código duplicado

Arquitectura limpia

SOLID

DRY

KISS

Atomic Design

Feature First

Hooks reutilizables

Componentes reutilizables

--------------------------------------------------

## ESTRUCTURA

/src

/components

/features

/pages

/layouts

/hooks

/store

/services

/api

/utils

/lib

/constants

/assets

/styles

/types

--------------------------------------------------

## DOCUMENTACIÓN

Generar:

README profesional

Guía de despliegue en Vercel

Arquitectura

Diagramas Mermaid

Manual de componentes

Roadmap

Changelog

--------------------------------------------------

## REGLA FINAL

Antes de implementar cualquier funcionalidad:

1. Analizar si existe una API gratuita mejor.
2. Comparar rendimiento y cobertura.
3. Integrar múltiples fuentes cuando sea posible.
4. Diseñar la solución para escalar.
5. Evitar dependencias innecesarias.
6. Mantener el proyecto completamente compatible con Vercel y sin backend.

El resultado final debe sentirse como una combinación entre FlightRadar24, Google Earth, ArcGIS, Windy, Apple Maps y un dashboard ejecutivo moderno, con una interfaz premium, rápida, precisa, extensible y lista para producción.