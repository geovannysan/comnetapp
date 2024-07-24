import { registerPlugin } from "@capacitor/core"

export interface IPAdrees {
    NativeMethod(): Promise<{ value: string }>
}
const IpAndress = registerPlugin<IPAdrees>('IpAndress')
export default IpAndress