package logic;

import models.AreaData;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class RequestDataValidator {
    private static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    public static <T> Optional<List<String>> constraint_violations(T data) {
        Set<ConstraintViolation<T>> violations = validator.validate(data);
        List<String> violation_messages = violations.stream()
                .map(ConstraintViolation::getMessage).collect(Collectors.toList());
        return (violation_messages.isEmpty()) ? Optional.empty() : Optional.of(violation_messages);

    }
}
