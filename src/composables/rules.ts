export function useFieldValidation() {
  const { t } = useI18n();
  function validateNotEmpty(
    val: any,
    errorMessage: string = t("auth.fillField"),
  ): boolean | string {
    return (val && val.length > 0) || errorMessage;
  }
  function validateDateTime(val: string): boolean | string {
    if (!val) {
      return "Informe Data e Hora";
    }
    const dateTimePattern = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
    const match = val.match(dateTimePattern);
    if (!match) {
      return "Informe a Hora";
    }
    return true;
  }
  return {
    validateNotEmpty: computed(() => validateNotEmpty),
    validateDateTime: computed(() => validateDateTime),
  };
}
