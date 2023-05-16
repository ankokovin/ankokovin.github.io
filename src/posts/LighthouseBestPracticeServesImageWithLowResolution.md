# Lighthouse Best Practice "Serves images with low resolution" с svg изображениями

## Проблема

Небольшая проблемка, которая возникла при разработке этой странички.

В какой-то момент мне захотелось поменять принцип расположенного на сайте списка TODO. Вместо того, чтобы вручную изменять статус пункта, его статус стал привязан к статусу Issue на Гитхабе. Для реализации мне лишь потребовалось создать Issue для каждого ещё не выполненного пункта, а статус Issue решил отображать при помощи бейджа от [shields.io](https://shields.io/category/issue-tracking). Интересующий меня бэйдж доступен по следующему URL:
```
https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number>
```
Однако после их добавления, я с ужасом обнаружил, что мой score в Best Practices в Lighthouse упал.

![Alt text](imgs/Screenshot%20from%202023-05-16%2021-39-33.png)

## Ожидаемое решение

[Статья](https://web.dev/serve-responsive-images/?utm_source=lighthouse&utm_medium=devtools), на которую указывает devtools для данной ошибке говорит об адаптивной загрузке изображений, про добавление атрибутов `srcset` и `sizes` в тэг `<img>`. Первая страница гугла также говорит о них.

[Кому-то](https://github.com/GoogleChrome/lighthouse/issues/11936#issuecomment-808444051) просто помогло добавить эти атрибуты. Я тоже попробывал заменить
```
<img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number>"/>
```
на
```
<img alt="GitHub issue/pull request detail" 
    src="https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number>" 
    sizes="86px"/>
```
и на 
```
<img alt="GitHub issue/pull request detail" 
    src="https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number>" 
    srcset="https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number> 86w"/>
```
и даже самый странный варинт
```
<img alt="GitHub issue/pull request detail" 
    src="https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number>" 
    srcset="https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number> 86w, 
            https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number> 172w"/>
```
но Lighthouse был неприклонен.

## Реальное решение

На этот момент я задумался: "Странно, вроде бы это не первая картинка на сайте. Почему это сообщение появилось только сейчас? Да и откуда мне взять ещё одно изображение с 2х разрешением, если сервис даёт только одно? Неужели придётся расстаться с красивой оценкой 100 в Best Practices?"

Только через несколько минут всё встало на свои места. Все изображения на сайте на тот момент являлись *svg* изображениями. Одной примечательной особенностью векторной графики является то, что изображения могут принимать любые размеры без потери качества. Конечно Lighthouse не может на них жаловаться!

Затем я обратил внимание, что получаемые от shields.io бэйджи тоже являются *svg*! Отличие этих бейджей от уже используемых изображениях заключается только в следующем:
- Используемые ранее изображения лежат прямо на сайте, здесь же происходит получение от другого домена. Этот момент наверняка не является важным для Lighthouse. 
- Ранние изображения все в `src` заканчиваются на `.svg`. Именно этот момент и является значимым отличием.

К счастью я обнаружил, что 
```
<img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/<user-name>/<repo-name>/<issue-number>.svg"/>
```
также работает. И этого стало достаточно чтобы вернуть оценку 100 по Best Practice.

## Заключение

К сожалению я не являюсь экспертом, чтобы понять, почему изображение с `src = "https://<site>/<img>.svg"` лучше, чем с `src = "https://<site>/<img>"`. Возможно подсказка, что получаемое изображение является *svg*, а не, например, *jpеg*, заранее помогает провести некоторые оптимизации?  