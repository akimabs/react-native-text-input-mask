import { __awaiter, __rest } from "tslib";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { findNodeHandle, NativeModules, Platform, TextInput } from 'react-native';
const { RNTextInputMask } = NativeModules;
if (!RNTextInputMask) {
    throw new Error(`NativeModule: RNTextInputMask is null.
To fix this issue try these steps:
  • Rebuild and restart the app.
  • Run the packager with \`--clearCache\` flag.
  • If happening on iOS, run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app.
  • If this happens while testing with Jest, make sure to follow instructions in https://github.com/react-native-text-input-mask/react-native-text-input-mask#testing
`);
}
export const { mask, unmask, setMask } = RNTextInputMask;
const TextInputMask = forwardRef((_a, ref) => {
    var { mask: primaryFormat, defaultValue, value, multiline, onChangeText, affineFormats, customNotations, affinityCalculationStrategy, autocomplete = true, autoskip = true, rightToLeft } = _a, rest = __rest(_a, ["mask", "defaultValue", "value", "multiline", "onChangeText", "affineFormats", "customNotations", "affinityCalculationStrategy", "autocomplete", "autoskip", "rightToLeft"]);
    const input = useRef(null);
    const [maskedValue, setMaskedValue] = useState();
    useEffectAsync(() => __awaiter(void 0, void 0, void 0, function* () {
        const initialValue = value !== null && value !== void 0 ? value : defaultValue;
        if (!initialValue)
            return;
        if (primaryFormat) {
            const masked = yield mask(primaryFormat, initialValue, false);
            setMaskedValue(masked);
        }
        else {
            setMaskedValue(initialValue);
        }
    }), []);
    useEffectAsync(() => __awaiter(void 0, void 0, void 0, function* () {
        if (value === maskedValue)
            return;
        if (primaryFormat && value) {
            const masked = yield mask(primaryFormat, value, false);
            setMaskedValue(masked);
        }
        else {
            setMaskedValue(value);
        }
    }), [value]);
    useEffect(() => {
        const nodeId = findNodeHandle(input.current);
        if (primaryFormat && nodeId) {
            setMask(nodeId, primaryFormat, { affineFormats, affinityCalculationStrategy, customNotations, autocomplete, autoskip, rightToLeft });
        }
    }, [primaryFormat]);
    useImperativeHandle(ref, () => ({
        focus: () => {
            var _a;
            (_a = input.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        blur: () => {
            var _a;
            (_a = input.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
    }));
    return (<TextInput {...rest} ref={input} value={maskedValue} multiline={primaryFormat && Platform.OS === 'ios' ? false : multiline} onChangeText={(masked) => __awaiter(void 0, void 0, void 0, function* () {
            setMaskedValue(masked);
            if (primaryFormat) {
                const unmasked = yield unmask(primaryFormat, masked, true);
                onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText(masked, unmasked);
            }
            else {
                onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText(masked);
            }
        })}/>);
});
export const useEffectAsync = (operation, deps) => {
    useEffect(() => {
        operation().then();
    }, deps);
};
export default TextInputMask;
//# sourceMappingURL=index.js.map