function Toast({message, visible}) {
    if (!visible) return null
    return(
        <div className="fixed bottom-6 right-6 z-200 bg-surface2 border border-border border-l-4 border-l-purple-bright p-3 rounded-lg text-sm text-white">{message}</div>
    )
}

export default Toast