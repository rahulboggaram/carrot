"use client";

import { forwardRef, useState } from "react";

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  showOptional?: boolean;
  placeholder?: string;
  hint?: string;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      showOptional = false,
      placeholder = "Placeholder",
      hint,
      error,
      disabled,
      id,
      onFocus,
      onBlur,
      className,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "text-input";
    const hasError = Boolean(error);
    const hintText = error ?? hint;

    return (
      <div
        className={["flex flex-col w-full", className].filter(Boolean).join(" ")}
        style={{ gap: "8px" }}
      >
        {/* Label Row — Figma node 16:22 */}
        {label && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            height: "24px",
            width: "100%",
          }}>
            <label
              htmlFor={inputId}
              style={{
                flex: 1,
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "24px",
                color: disabled ? "var(--color-content-disabled)" : "var(--color-content-primary)",
                cursor: "default",
              }}
            >
              {label}
            </label>
            {showOptional && (
              <span style={{
                flexShrink: 0,
                whiteSpace: "nowrap",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "24px",
                color: disabled ? "var(--color-content-disabled)" : "var(--color-content-primary)",
              }}>
                (Optional)
              </span>
            )}
          </div>
        )}

        {/* Field — Figma node 11:6 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "56px",
            borderRadius: "8px",
            padding: "8px",
            background: disabled
              ? "var(--color-background-disabled)"
              : focused
              ? "var(--color-background-primary)"
              : "var(--color-background-tertiary)",
            border: hasError
              ? "2px solid var(--color-border-negative)"
              : focused && !disabled
              ? "2px solid var(--color-border-selected)"
              : "2px solid transparent",
            transition: "background 0.15s, border-color 0.15s",
            cursor: disabled ? "not-allowed" : "text",
            boxSizing: "border-box",
          }}
          onClick={() => !disabled && document.getElementById(inputId)?.focus()}
        >
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={(e) => { setFocused(true); onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); onBlur?.(e); }}
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "28px",
              color: disabled ? "var(--color-content-disabled)" : "var(--color-content-primary)",
              cursor: disabled ? "not-allowed" : "text",
            }}
            className={disabled ? "placeholder:text-content-disabled" : "placeholder:text-content-tertiary"}
            {...props}
          />
        </div>

        {/* Hint — Figma node 11:7 */}
        {hintText && (
          <p style={{
            width: "100%",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: hasError ? "var(--color-content-negative)" : "var(--color-content-tertiary)",
            margin: 0,
          }}>
            {hintText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;