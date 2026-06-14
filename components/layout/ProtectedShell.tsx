import { AppHeader } from './AppHeader';export async function ProtectedShell({children}:{children:React.ReactNode}){return <><AppHeader/><main className="mx-auto max-w-6xl p-5">{children}</main></>}
