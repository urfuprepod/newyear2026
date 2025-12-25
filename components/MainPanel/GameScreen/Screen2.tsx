"use client";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { IQuestion, useNewYearStore } from "@/store";
import { FC, useEffect, useMemo, useRef, useState } from "react";

const questions: IQuestion[] = [
    {
        text: "Небезызвестный Гэндальф рассказывал, что в разных краях его зовут по-разному. Когда он бывал у эльфов, его звали Митрандир, когда у гномов — Таркун, когда он бывал на западе, он звался Олорином, когда бывал на юге — Инканус, на севере — Гэндальф. А вот относительно востока он такой информации не приводит. Почему?",
        title: "Вопрос 1",
        price: 300,
    },
    {
        text: "Современник этих событий XIX века так описывал их: «Ненасытный молох каждый час требует всё новых жертв, и [слово пропущено] — англичанин и [слово пропущено] — китаец соперничают друг с другом в приношении ему жертв». Вставьте два пропущенных слова, второе из которых на четыре буквы длиннее первого.",
        title: "Вопрос 2",
        price: 300,
    },
    {
        text: "Впервые о ней рассказал перс в XII в. Затем произведения о ней создали два итальянца. Но в Советском Союзе ее имя было неразрывно связано с грузином. Назовите ее.",
        title: "Вопрос 3",
        price: 300,
    },
    {
        text: "Одна из статей первой Конституции Армянской СССР 1922 г. вызвала резкий протест со стороны Турции. Конституция утвердила описание герба Армении. Герб представлял собой изображение Большого и Малого Масиса (Арарата), над которыми в лучах восходящего солнца располагались серп и молот, у подножия – куст винограда с лозой и листьями, колосья пшеницы и ветки маслины. Рассказывают, что турецким дипломатам пришлось снять свой протест только после того, как нарком иностранных дел СССР Г.В. Чичерин задал им вопрос: «А разве Турции принадлежит ___?» Принадлежность чего могла послужить аргументом для Чичерина?",
        title: "Вопрос 4",
        price: 300,
    },
    {
        text: "Экспедиции адмирала Чжэн Хэ в Индийский океан в начале XV века совершались ради повышения престижа страны и были чересчур дороги, а потомки даже не пытались их повторить. Гэри Оулсон сравнивает плавания Чжэн Хэ с ЭТИМ. В честь какого бога ЭТО названо?",
        title: "Вопрос 5",
        price: 300,
    },
    {
        text: "Каждый народ любит и знает своих героев. По названиям российских улиц и городов до сих пор можно изучать историю КПСС. В израильских топонимах популярны Герцль и Рамбам. В Багдаде недавно увековечили в названии улицы Арафата. А в одной стране автору вопроса часто попадалось название «Эм Джи Роуд». В честь кого?",
        title: "Вопрос 6",
        price: 300,
    },
    {
        text: "Сталин не доверял Мао Цзедуну, считая, что тот лишь внешне следует марксистским идеям, а на самом деле им неверен. Рассказывают, что в связи с эти Сталин однажды применил для характеристики Мао одно слово. С 1971 года многие жители СССР познакомились с употреблением этого же слова в качестве отрицательной характеристики. Назовите это слово.",
        title: "Вопрос 7",
        price: 300,
    },
    {
        text: "Во время одной из конференций E3 Microsoft представила Xbox. Вечером перед этим Sony пригласила журналистов на мероприятие в честь успеха PlayStation 2. Сотрудник Microsoft считает, что Sony использовала ЭТО против конкурентов. Назовите ЭТО одним словом.",
        title: "Вопрос 8",
        price: 300,
    },
    {
        text: "В одном из роликов серии «Epic Rap Battles of History» восточные философы выступают против западных. Высмеивая нелепую форму усов своего оппонента, Конфуций говорит, что ПРОПУСК от стыда. Заполните ПРОПУСК двумя словами.",
        title: "Вопрос 9",
        price: 300,
    },
    {
        text: "Он умер в 326 году до нашей эры от чрезмерного напряжения после битвы при Гидаспе. Еще в XIII веке монголы помнили его и показывали его потомков, хотя сомнительно, чтобы это действительно были его прямые потомки. Назовите его имя.",
        title: "Вопрос 10",
        price: 300,
    },
];
type Props = {
    parentWidth: number;
};

const Screen2: FC<Props> = ({ parentWidth }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState(false);

    const { stop } = useAudioPlayer("/volchok.mp3");

    const parentWidthWithoutPadding = parentWidth - 15;

    const { makeQuestionRead, readedQuestions, setStep } = useNewYearStore();
    const freeQuestions = useMemo(() => {
        return questions.filter(
            ({ title }) => !readedQuestions.includes(title)
        );
    }, [readedQuestions]);
    const [isPlaying, setIsPlaying] = useState<boolean>(
        !!readedQuestions.length
    );

    // делаем длинную ленту
    const extendedItems: IQuestion[] = Array(50).fill(freeQuestions).flat();

    const spin = () => {
        if (!trackRef.current || spinning) return;

        setSpinning(true);

        // сколько элементов пролетим ДО выигрыша
        const baseScroll = 10 + Math.floor(Math.random() * 6); // 10–15

        const winner = 4 + baseScroll;

        const track = trackRef.current;

        track.style.transition =
            "transform 5s cubic-bezier(0.15, 0.85, 0.35, 1)";
        track.style.transform = `translateX(-${
            (parentWidthWithoutPadding / 10) * (baseScroll - 0.5)
        }px)`;

        setTimeout(() => {
            // фиксируем победителя
            makeQuestionRead(freeQuestions[winner % freeQuestions.length]);
            setSpinning(false);
        }, 5000);
    };

    useEffect(() => {
        if (!isPlaying) {
            stop();
            return
        }
        if (freeQuestions.length === 0) {
            stop();
            setStep();
            return;
        }
        if (freeQuestions.length > 1) {
            spin();
        } else {
            setTimeout(() => {
                makeQuestionRead(freeQuestions[0]);
            }, 1000);
        }
    }, [isPlaying]);

    if (parentWidth === 0) return null;
    return (
        <div className="w-full">
            {!isPlaying ? (
                <h2
                    onClick={() => setIsPlaying(true)}
                    className="text-3xl cursor-pointer text-center"
                >
                    Раунд 1 <br /> ЧТО? ГДЕ? КОГДА?
                </h2>
            ) : (
                <>
                    <div
                        ref={containerRef}
                        style={{
                            overflow: "hidden",
                            border: "2px solid #333",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                left: "50%",
                                width: 2,
                                background: "red",
                                zIndex: 2,
                            }}
                        />

                        {/* лента */}
                        <div
                            ref={trackRef}
                            style={{
                                display: "flex",
                                height: "100%",
                                alignItems: "center",
                                willChange: "transform",
                                gap: 8,
                            }}
                        >
                            {extendedItems.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flex: `0 0 ${
                                            (parentWidth - 15) / 10 - 8
                                        }px`,
                                        aspectRatio: "3 / 2",
                                        background: "#222",
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        borderRadius: 6,
                                    }}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Screen2;
