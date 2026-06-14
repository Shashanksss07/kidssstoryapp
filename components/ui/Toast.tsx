export function Toast({message}:{message?:string}){if(!message)return null;return <div role="status" className="rounded-2xl bg-stone-900 px-4 py-3 text-white shadow-soft">{message}</div>}
