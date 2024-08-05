export function useFieldValidation() {
  const { t } = useI18n();
  const dateTimePattern = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
  function validateNotEmpty(
    val: any,
    errorMessage: string = t("auth.fillField"),
  ): boolean | string {
    return (val && val.length > 0) || errorMessage;
  }

  function validateDateTime(val: string): boolean | string {
    const [datePart, timePart] = val.split(" ");
    if (!datePart && !timePart) {
      return t("auth.insertDateTime");
    }
    if (datePart && !timePart) {
      return t("auth.insertTime");
    }
    if (!datePart && timePart) {
      return t("auth.insertDate");
    }

    return true;
  }
  function validateInputOfFileOrImg(val: any): boolean | string {
    if (typeof val === "object") {
      return true;
    }
    return t("folders.insertFile");
  }
  return {
    validateNotEmpty: computed(() => validateNotEmpty),
    validateDateTime: computed(() => validateDateTime),
    validateInputOfFileOrImg: computed(() => validateInputOfFileOrImg),
  };
}
