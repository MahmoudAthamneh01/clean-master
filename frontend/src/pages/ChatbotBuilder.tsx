const ChatbotBuilder = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Chatbot Builder</h1>
        <p className="text-muted-foreground mt-2">
          Visual WhatsApp chatbot flow designer
        </p>
      </div>

      <div className="card">
        <div className="card-content p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Chatbot Flow Designer</h3>
          <p className="text-muted-foreground">
            This module will contain the chatbot builder including:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2 text-muted-foreground">
            <li>Drag-and-drop flow designer</li>
            <li>Message templates and responses</li>
            <li>Conditional logic and branching</li>
            <li>Integration with booking system</li>
            <li>Multi-language support</li>
            <li>Flow testing and debugging</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChatbotBuilder