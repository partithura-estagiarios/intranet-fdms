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
      return t("auth.fillField");
    }

    const dateTimePattern = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
    const match = val.match(dateTimePattern);
    if (!match) {
      return t("auth.invalidDateTimeFormat");
    }

    const [_, day, month, year, hour, minute] = match.map(Number);
    const date = new Date(year, month - 1, day, hour, minute);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day ||
      date.getHours() !== hour ||
      date.getMinutes() !== minute
    ) {
      return t("auth.invalidDateTime");
    }

    return true;
  }

  return {
    validateNotEmpty: computed(() => validateNotEmpty),
    validateDateTime: computed(() => validateDateTime),
  };
}
