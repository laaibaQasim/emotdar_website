from model.contributor import Contributor
from model.sentence import Sentence
from model.emotion_sentence import EmotionSentence
from model.emotion import Emotion
from model.recording import Recording


def add_sentences():
    urdu_sentences = [
        "گیارہ بج گۓ ہیں",
        "بارش ہو رہی ہے",
        "تم پھر آ گۓ",
        "تم کہاں رہتے ہو",
        "کیا کر ریے ہو",
    ]
    for sentence in urdu_sentences:
        sentence = Sentence(sentence_text=sentence)
        sentence.insert()


def add_emotions():
    emotions = ["Neutral", "Happy", "Sad", "Fearful", "Angry", "Disgust", "Surprise"]
    for emotion in emotions:
        new_emotion = Emotion(name=emotion)
        new_emotion.insert()


def add_emotion_sentence():
    sentences = Sentence.get()
    emotions = Emotion.get()
    for sentence in sentences:
        for emotion in emotions:
            emotion_sentence = EmotionSentence(
                sentence_id=sentence.id, emotion_id=emotion.id
            )
            emotion_sentence.insert()


def add_dummy_data():
    if not Sentence.get():
        add_sentences()
        add_emotions()
        add_emotion_sentence()


def save_contributor(roll_no, password="pucit"):
    try:
        contributor = Contributor.get_by_roll_number(roll_no)
        if not contributor:
            to_add = {"roll_number": roll_no, "password": password}
            return Contributor(**to_add).insert()
        return contributor
    except Exception as e:
        print("Could not save contributor:", e)
        return None


def save_data(roll_no, emotion, sentence_id, audio, video):
    contributor = save_contributor(roll_no)
    emotion_id = Emotion.get_by_name(emotion).id
    emotion_sentence_id = EmotionSentence.get_by_emotion_sentence(
        sentence_id, emotion_id
    ).id

    if recording := Recording.get_by_id(emotion_sentence_id):
        Recording.update(
            recording.id, {"audio_recorded": audio, "video_recorded": video}
        )
    else:
        to_add = {
            "contributor_id": contributor.id,
            "emotion_sentence_id": emotion_sentence_id,
            "video_recorded": video,
            "audio_recorded": audio,
        }
        try:
            Recording(**to_add).insert()
        except Exception as e:
            print("Could not save recording:", e)
