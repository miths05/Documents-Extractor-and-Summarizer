import React, { useState, useRef, useEffect } from "react";
import StepsTracker from "../Components/Custom/StepsTracker";
import { 
  Bold, Italic, AlignLeft, AlignCenter, AlignRight, 
  Type, Save, Trash2, Copy, ChevronsDown, ChevronsUp 
} from "lucide-react";
import { Modal, Input, Button } from "antd";

const initialText = `
conditions prevalent before the injury and after injury:

  DOI:12/06/18.
Conditions Before the Injury:

Several conditions, such as sore throat, cough, bronchitis, diabetes, obesity, and sleep apnea, were recorded in earlier periods but are no longer present in the later dataset.
Many short-term conditions (e.g., phlegm, diarrhea, nasal trauma, postoperative follow-ups) have completely disappeared.

Conditions That Persisted After Injury:

Some conditions were not present in earlier records but appear later, including osteoarthritis of both knees, impingement syndrome of the right shoulder, postoperative knee surgeries, and industrial injuries.
Chronic ulcers of the leg increased from 0 to 1 mention.
Diabetes mellitus type 2 with diabetic dyslipidemia grew from 0 to 2 mentions.

Post-Surgical Issues:

Many later entries involve orthopedic issues (knee and shoulder injuries, post-arthroscopy status), suggesting an increase in musculoskeletal and degenerative conditions.
There is also a rise in postoperative follow-ups, such as status post-knee and shoulder surgeries.
`;

const TextAreaPage: React.FC = () => {
  const [text, setText] = useState(initialText);
  const [savedText, setSavedText] = useState(initialText);
  const [isSaved, setIsSaved] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsSaved(text === savedText);
  }, [text, savedText]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const getSelectedText = (): { text: string, start: number, end: number } => {
    if (!textAreaRef.current) return { text: '', start: 0, end: 0 };
    const { selectionStart, selectionEnd, value } = textAreaRef.current;
    return {
      text: value.substring(selectionStart, selectionEnd),
      start: selectionStart,
      end: selectionEnd
    };
  };

  const replaceSelectedText = (newText: string) => {
    if (!textAreaRef.current) return;
    const { selectionStart, selectionEnd, value } = textAreaRef.current;
    const newValue = value.substring(0, selectionStart) + newText + value.substring(selectionEnd);
    setText(newValue);
    
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(
          selectionStart + newText.length,
          selectionStart + newText.length
        );
      }
    }, 0);
  };

  const applyFormatting = (format: string) => {
    const { text: selectedText, start, end } = getSelectedText();
    if (start === end) return;

    let formattedText = selectedText;
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "uppercase":
        formattedText = selectedText.toUpperCase();
        break;
      case "lowercase":
        formattedText = selectedText.toLowerCase();
        break;
    }
    replaceSelectedText(formattedText);
  };

  const changeFontSize = (delta: number) => {
    setFontSize(prev => Math.max(12, Math.min(24, prev + delta)));
  };

  const saveText = () => {
    setSavedText(text);
    setIsSaved(true);
    showNotification("Text saved successfully!");
  };

  const resetText = () => {
    if (window.confirm("Are you sure you want to reset to the last saved version?")) {
      setText(savedText);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(
      () => showNotification("Text copied to clipboard!"),
      () => showNotification("Failed to copy text", true)
    );
  };

  const showNotification = (message: string, isError: boolean = false) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Textarea value:", textValue);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <Button
            type="primary"
            style={modalButtonStyle}
            onClick={showModal}
            onMouseEnter={(e) => {
              const button = e.currentTarget as HTMLButtonElement;
              Object.assign(button.style, {
                backgroundColor: '#096dd9',
                transform: 'scale(1.05)'
              });
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget as HTMLButtonElement;
              Object.assign(button.style, modalButtonStyle);
            }}
          >
            Medical Summary
          </Button>
        </div>

        <h1 style={titleStyle}>Report Summary</h1>
        <div style={dateContainerStyle}>
          <h2 style={subtitleStyle}>DOI: 12/06/18</h2>
        </div>
        
        <div style={toolbarStyle}>
          <button 
            style={buttonStyle} 
            onClick={() => applyFormatting("bold")}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button 
            style={buttonStyle} 
            onClick={() => applyFormatting("italic")}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <div style={dividerStyle}></div>
          <button 
            style={buttonStyle} 
            onClick={() => applyFormatting("uppercase")}
            title="Uppercase"
          >
            <Type size={16} />
            <span style={{ fontSize: '10px', marginLeft: '2px' }}>A</span>
          </button>
          <button 
            style={buttonStyle} 
            onClick={() => applyFormatting("lowercase")}
            title="Lowercase"
          >
            <Type size={16} />
            <span style={{ fontSize: '10px', marginLeft: '2px' }}>a</span>
          </button>
          <div style={dividerStyle}></div>
          <button 
            style={buttonStyle} 
            onClick={() => changeFontSize(1)}
            title="Increase font size"
          >
            <ChevronsUp size={16} />
          </button>
          <button 
            style={buttonStyle} 
            onClick={() => changeFontSize(-1)}
            title="Decrease font size"
          >
            <ChevronsDown size={16} />
          </button>
          <div style={dividerStyle}></div>
          <button 
            style={buttonStyle} 
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </button>
          <button 
            style={{...buttonStyle, marginLeft: 'auto'}} 
            onClick={resetText}
            disabled={isSaved}
            title="Reset to saved version"
          >
            <Trash2 size={16} color={isSaved ? '#aaa' : '#ff4d4f'} />
          </button>
          <button 
            style={{
              ...buttonStyle, 
              backgroundColor: isSaved ? '#aaa' : '#00b96b',
              opacity: isSaved ? 0.7 : 1
            }} 
            onClick={saveText}
            disabled={isSaved}
            title="Save changes"
          >
            <Save size={16} />
          </button>
        </div>
        
        <div style={textAreaContainerStyle}>
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={handleTextChange}
            style={{
              ...textAreaStyle,
              fontSize: `${fontSize}px`,
            }}
            placeholder="Enter your report summary here..."
          />
        </div>
        
        {notification && (
          <div style={notificationStyle}>
            {notification}
          </div>
        )}

        {/* Medical Summary Modal */}
        <Modal 
          title="Enter Medical Summary" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel} 
          width={800} 
          style={{top: 50}}
        >
          <Input.TextArea
            rows={8}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            style={{
              minHeight: "400px",
              width: "100%",
              padding: "12px",
              fontSize: "16px",
            }}
            placeholder="Enter medical summary details here..."
          />
        </Modal>
      </div>
      
      <div style={stepsContainerStyle}>
        <StepsTracker step={8} />
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "rgb(199, 222, 255)",
  padding: "30px 20px",
};

const cardStyle: React.CSSProperties = {
  width: "85%",
  maxWidth: "1200px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  transition: "box-shadow 0.3s ease",
  position: "relative",
  height: "950px",
};

const headerStyle: React.CSSProperties = {
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 1,
};

const modalButtonStyle: React.CSSProperties = {
  backgroundColor: '#1890ff',
  borderColor: '#1890ff',
  borderRadius: '6px',
  color: '#ffffff',
  fontWeight: 500,
  padding: '8px 16px',
  transition: 'all 0.3s ease-in-out',
};

const titleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "8px",
  color: "#1a1a1a",
  textAlign: "center",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#666",
  margin: 0,
};

const dateContainerStyle: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  padding: "10px 16px",
  borderRadius: "8px",
  marginBottom: "20px",
  alignSelf: "flex-start",
};

const toolbarStyle: React.CSSProperties = {
  marginBottom: "15px",
  display: "flex",
  gap: "8px",
  alignItems: "center",
  padding: "8px",
  backgroundColor: "#f6f9fc",
  borderRadius: "8px",
  flexWrap: "wrap",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: "#333",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "36px",
  width: "36px",
  transition: "all 0.2s ease",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const dividerStyle: React.CSSProperties = {
  width: "1px",
  height: "20px",
  backgroundColor: "#e0e0e0",
  margin: "0 4px",
};

const textAreaContainerStyle: React.CSSProperties = {
  width: "100%",
  flexGrow: 1,
  position: "relative",
  minHeight:"800px",
};
const enhancedTextAreaStyle: React.CSSProperties = {
  width: '100%',
  flexGrow: 1,
  padding: '15px 15px 15px 45px',
  borderRadius: '10px',
  border: '2px solid rgb(78, 66, 96)',
  fontSize: '16px',
  resize: 'none',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  outline: 'none',
  transition: 'all 0.3s ease-in-out',
  minHeight: '550px', // Updated height
  height: '550px',    // Added fixed height
  fontFamily: 'Inter, system-ui, sans-serif',
  lineHeight: '1.6',
};

const textAreaStyle: React.CSSProperties = {
  width: "100%",
  height: "60vh",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #e0e0e0",
  fontSize: "16px",
  lineHeight: 1.5,
  resize: "none",
  backgroundColor: "#ffffff",
  boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.05)",
  outline: "none",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const notificationStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "12px 24px",
  backgroundColor: "#00b96b",
  color: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  zIndex: 1000,
  animation: "fadeIn 0.3s, fadeOut 0.3s 2.7s",
};

const stepsContainerStyle: React.CSSProperties = {
  width: "85%",
  maxWidth: "1200px",
  marginTop: "20px",
};

export default TextAreaPage;