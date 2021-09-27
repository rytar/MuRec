module.exports = {
    mode: "development",
    entry: "./src/MuRec.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: "MuRec.js",
        library: "MuRec",
        libraryTarget: "umd",
        libraryExport: "default"
    }
};