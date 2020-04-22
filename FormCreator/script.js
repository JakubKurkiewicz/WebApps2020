document.addEventListener('DOMContentLoaded', function () { return StartProgram(); });
function StartProgram() {
    var app = new App(textbox, textboxSur, email, select, checkbox, textarea, date);
    app.Show();
}
var FieldType;
(function (FieldType) {
    FieldType[FieldType["textBox"] = 1] = "textBox";
    FieldType[FieldType["textarea"] = 2] = "textarea";
    FieldType[FieldType["date"] = 3] = "date";
    FieldType[FieldType["email"] = 4] = "email";
    FieldType[FieldType["select"] = 5] = "select";
    FieldType[FieldType["checkbox"] = 6] = "checkbox";
})(FieldType || (FieldType = {}));
var TextBox = /** @class */ (function () {
    function TextBox(name, label) {
        this.name = name;
        this.type = FieldType.textBox;
        this.element = document.createElement('input');
        this.element.name = this.name;
        this.element.type = 'text';
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }
    TextBox.prototype.render = function () {
        return this.element;
    };
    TextBox.prototype.getValue = function () {
        return this.element.value;
    };
    return TextBox;
}());
var TextAreaField = /** @class */ (function () {
    function TextAreaField(name, label) {
        this.name = name;
        this.type = FieldType.textarea;
        this.element = document.createElement('textarea');
        this.element.name = this.name;
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }
    TextAreaField.prototype.render = function () {
        return this.element;
    };
    TextAreaField.prototype.getValue = function () {
        return this.element.value;
    };
    return TextAreaField;
}());
var DateField = /** @class */ (function () {
    function DateField(name, label) {
        this.name = name;
        this.type = FieldType.date;
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = 'date';
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }
    DateField.prototype.render = function () {
        return this.element;
    };
    DateField.prototype.getValue = function () {
        return this.element.value;
    };
    return DateField;
}());
var EmailField = /** @class */ (function () {
    function EmailField(name, label) {
        this.name = name;
        this.type = FieldType.email;
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = 'email';
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }
    EmailField.prototype.render = function () {
        return this.element;
    };
    EmailField.prototype.getValue = function () {
        return this.element.value;
    };
    return EmailField;
}());
var SelectField = /** @class */ (function () {
    function SelectField(name, label) {
        var _this = this;
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        this.name = name;
        this.type = FieldType.select;
        this.element = document.createElement('select');
        options.forEach(function (element) {
            var opt = document.createElement('option');
            opt.value = element;
            opt.text = element;
            _this.element.add(opt);
        });
        this.element.name = name;
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }
    SelectField.prototype.render = function () {
        return this.element;
    };
    SelectField.prototype.getValue = function () {
        return this.element.value;
    };
    return SelectField;
}());
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label) {
        this.name = name;
        this.type = FieldType.checkbox;
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = 'checkbox';
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }
    CheckboxField.prototype.render = function () {
        return this.element;
    };
    CheckboxField.prototype.getValue = function () {
        if (this.element.checked) {
            return "Tak";
        }
        else {
            return "Nie";
        }
    };
    return CheckboxField;
}());
var Form = /** @class */ (function () {
    function Form(idForm, idValues) {
        this.fields = new Array();
        this.formElement = document.getElementById(idForm);
        this.valueElement = document.getElementById(idValues);
    }
    Form.prototype.render = function () {
        var _this = this;
        this.fields.forEach(function (element) {
            _this.formElement.appendChild(element.label);
            _this.formElement.appendChild(element.render());
        });
    };
    Form.prototype.getValue = function () {
        var lista = document.createElement('ol');
        lista.className = "lista";
        this.valueElement.appendChild(lista);
        this.fields.forEach(function (element) {
            var li = document.createElement('li');
            li.innerText = element.labelValue + ": " + element.getValue();
            lista.appendChild(li);
        });
    };
    return Form;
}());
var App = /** @class */ (function () {
    function App() {
        var _a;
        var _this = this;
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        this.form = new Form('formInput', 'formOut');
        (_a = this.form.fields).push.apply(_a, elements);
        this.sButton = document.getElementById('submit');
        this.sButton.addEventListener('click', function () { return _this.form.getValue(); });
    }
    App.prototype.Show = function () {
        this.form.render();
    };
    return App;
}());
var textbox = new TextBox('Name', 'Imię');
var textboxSur = new TextBox('Surname', 'Nazwisko');
var email = new EmailField('Email', 'Email');
var select = new SelectField('Select', 'Kierunek studiów', 'Informatyka', 'Aktorstwo', 'Wzornictwo', 'Etyka');
var checkbox = new CheckboxField('Learning', 'Czy preferujesz e-learning?');
var textarea = new TextAreaField('Notes', 'Uwagi');
var date = new DateField('Date', 'Data');
