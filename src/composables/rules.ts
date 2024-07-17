export function useFieldValidation() {
  const { t } = useI18n();
  function validateNotEmpty(
    val: any,
    errorMessage: string = t("auth.fillField"),
  ): boolean | string {
    return (val && val.length > 0) || errorMessage;
  }

  return {
    validateNotEmpty: computed(() => validateNotEmpty),
  };
}
