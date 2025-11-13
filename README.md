# Portfolio

My portfolio

## Selección de Proyectos Destacados
La sección de proyectos usa un archivo de configuración editable en `Portfolio/config/featured.ts`.

### Cómo cambiar los proyectos
1. Abre `Portfolio/config/featured.ts`.
2. Edita el arreglo `featuredRepos`: cambia orden, títulos, descripciones o tecnologías.
3. Solo se toman los primeros `MAX_FEATURED` (por defecto 4).
4. Guarda y ejecuta `npm run dev` o haz build para ver los cambios.

### Campos de cada objeto
- `owner`: Usuario u organización GitHub.
- `repo`: Nombre del repositorio.
- `title`: Título mostrado en la tarjeta.
- `description`: Texto corto.
- `type`: 'web' | 'mobile'.
- `tech`: Tecnologías principales (array de strings).

### Cambiar el número máximo
Modifica la constante `MAX_FEATURED` en el mismo archivo para mostrar más o menos proyectos.

### Ejemplo
```ts
{
Después de editar: commit y push para desplegar en GitHub Pages.
