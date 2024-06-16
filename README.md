# LANGCHAIN API AICLON

Este proyecto ofrece una integración de modelos de inteligencia artificial como **OpenAI**, **Cloudflare**, y **Gemini** para procesar y responder solicitudes automáticamente. Utiliza tecnologías como **Generative AI** y bases de datos vectoriales para mejorar la relevancia de las respuestas.

### Variables de Entorno

A continuación, se listan las variables de entorno necesarias para configurar el entorno de desarrollo y producción:

- `CLOUDFLARE_ACCOUNT_ID`: ID de cuenta de Cloudflare, necesario únicamente si se opta por utilizar Cloudflare como modelo de IA.
- `CLOUDFLARE_API_TOKEN`: Token de API específico para autenticación con servicios de Cloudflare.
- `CLOUDFLARE_MODEL_NAME`: Nombre del modelo de IA de Cloudflare que se utilizará.
- `GOOGLE_API_KEY`: Clave de API necesaria para utilizar los servicios de embeddings de Google y Gemini como modelo de IA.
- `OPENAI_API_KEY`: Clave de API para acceder a los servicios de OpenAI.
- `OPENAI_MODEL`: Modelo de IA de OpenAI que se utilizará por defecto es `gpt-3.5-turbo-0125`.
- `ModelAI`: Especifica el modelo de IA que se utilizará (opciones disponibles: `OpenAI`, `Cloudflare`, `Gemini` ).
- `EMBEDDINGS`: Identificador único para los embeddings utilizados, por ejemplo, `embedding-001`.
- `QDRANT_URL`: URL de conexión a la base de datos vectorial de Qdrant.
- `QDRANT_API_KEY`: Clave de API para interactuar con la base de datos vectorial de Qdrant.
- `RETRIVER`: Número de documentos que se recuperarán por cada consulta realizada.
- `VECTOR_STORE`: Configuración del sistema de almacenamiento vectorial utilizado por defecto es `qdrant`.

Asegúrate de configurar adecuadamente estas variables antes de iniciar tu aplicación para garantizar su correcto funcionamiento.

## Instalación

**Sigue estos pasos para instalar el API:**

1. **Instala PNPM globalmente (si aún no lo tienes):**
   ```bash
   npm install -g pnpm
   ```
2. **Clona el repositorio:**
   ```bash
   git clone 
   cd 
   ```
3. **Instala las dependencias con PNPM:**
   ```bash
   pnpm install
   ```

## Scripts Disponibles

**Compila el proyecto para producción:**

```bash
pnpm build
```

## Ejecución

**Una vez compilado, puedes iniciar el API con:**

```bash
pnpm start
```

**Para desarrollo y pruebas, utiliza el comando que incluye configuraciones de desarrollo:**

```bash
pnpm dev
```

### Descripción de las Rutas del Proyecto

#### 1. Chat con la IA

- **URL**: `http://localhost:3000/ai/chatmodel`
- **Método**: `POST`
- **Descripción**: Esta ruta permite interactuar con la inteligencia artificial enviando preguntas.
- **Body de la petición**:
  ```json
  {
    "Question": "Dame mas detalles sobre le plan ultra",
    "Name": "Juanito",
    "collectionName": "documents",
    "PromptName": "Prompt",
    "History": "USER: HOLA, ASISTENTE: ¡Hola Juanito!"
  }
  ```
  **Parámetros**:
  - `Question`: Pregunta que se le hará a la IA.
  - `Name`: Nombre del usuario que realiza la pregunta.
  - `collectionName`: Nombre de la colección de documentos que se utilizará para la recuperación de información.
  - `PromptName`: Nombre del prompt que se utilizará para la generación de respuestas.
  - `History`: Historial de conversación entre el usuario y la IA.

#### 2. Ingesta de Documentos en la Base de Datos Vectorial

- **URL**: `http://localhost:3000/ingest/upload`
- **Método**: `POST`
- **Descripción**: Ruta para subir documentos que alimentarán y mejorarán el modelo de IA. Se utiliza para expandir la base de conocimientos de la IA.
- **Parámetro Key**: `archivos` - Especifica la clave utilizada para los archivos que se subirán.
- **Limitaciones**: Se acepta un máximo de 10 archivos por operación de ingestión.
- **Formatos Aceptados**:
  - `.pdf` - Documento PDF
  - `.txt` - Archivos de texto plano
- **Parámetros de la petición**:
  ```json
  {
    "collectionName": "documents"
  }
  ```

#### 3. Guardar el documento del Prompt

**URL**: `http://localhost:3000/prompt/savePrompt`
**Método**: `POST`
**Descripción**: Ruta para guardar el prompt que se utilizará para la generación de respuestas.

- **Formatos Aceptados**:
  - `.txt` - Archivos de texto plano
- **Parámetro Key**: `prompt` - Especifica la clave utilizada para los archivos que se subirán.
- **Limitaciones**: Se acepta un máximo de 10 archivos por operación de ingestión.

- **Observaciones**:
  - El mismo nombre del archivo se utilizará como nombre del prompt.
