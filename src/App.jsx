
import QRCodePdfGenerator from "./components/qr-code-pdf-generator"
import QRCodeGenerator from "./components/qr-code-generator"
import QrToPdf from "./components/qr-code-pdf-generator-with-input-box"

function App() {

  const text = "https://www.chittaranjansaha.com"

  return (
    <div>

      {/* <QRCodeGenerator url={text} />
      
      <QRCodePdfGenerator url={text} /> */}

      <QrToPdf url={text} />

    </div>
  )
}

export default App
