# Economics Mobile App - React Native

## 1. Proceso de instalación

```sh
npx create-expo-app -t expo-template-blank-typescript economics-mobile-app-react_native
cd .\economics-mobile-app-react_native
```

```sh
npx expo install expo-device expo-dev-client
```

### 1.1. Configurando EAS client

Crear archivo eas.json

```json
{
    "build": {
        "development": {
            "developmentClient": true,
            "distribution": "internal"
        },
        "preview": {
            "distribution": "internal"
        },
        "production": {}
    }
}
```

Instalar eas-cli

```sh
npx npm install eas-cli
```

### 1.2. Prebuild

```sh
npm install --save-dev sharp-cli
npx expo prebuild
```
