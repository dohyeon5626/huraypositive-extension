require('dotenv').config();

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: "production",
   entry: {
      "background": ["./src/background/base.ts", "./src/background/router.ts", "./src/message/message_receiver.ts"],
      "calendar-content": ["./src/content/calendar.ts"],
      "spread-search": ["./src/content/spread.ts"],
      "popup": ["./src/popup/popup.ts"]
   },
   output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js"
   },
   resolve: {
      extensions: [".ts", ".js"]
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            loader: "ts-loader",
            exclude: /node_modules/
         }
      ]
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public"}]
      }),
      new CopyPlugin({
         patterns: [
            {
              from: "config/manifest.json",
              to: "manifest.json",
              transform(content, path) {
                return modifyManifest(content)
              },
            },
          ],
      })
   ]
}

const modifyManifest = (buffer) => {
   const manifest = JSON.parse(buffer.toString())
   manifest.key = process.env.KEY
   manifest.oauth2.client_id = process.env.CLIENT_ID
   return JSON.stringify(manifest, null, 2)
}