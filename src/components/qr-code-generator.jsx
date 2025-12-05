
import QRCode from 'react-qr-code'

export default function QRCodeGenerator(props) {
    return (
        <div style={{ background: 'white', padding: '16px', margin: "0 auto", maxWidth: "256px", width: "100%" }}>
            <QRCode value={props.url}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
            />
        </div>
    )
}
