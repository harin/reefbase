from django.test import TestCase
from divesites.models import Country, Destination, DiveSite
from django.core.exceptions import ValidationError
from notes.models import Note

# Create your tests here.
class NoteTestCase(TestCase):
    def setUp(self):
        pass


    def test_note_with_multiple_location(self):
        country = Country(name='A')
        destination = Destination(name='A', country=country)
        divesite = DiveSite(name='A', destination=destination)
        note_country = Note(country=country)
        note_country.clean()

        note_destination = Note(destination=destination)
        note_destination.clean()

        note_divesite = Note(divesite=divesite)
        note_divesite.clean()

        note_multi = Note(divesite=divesite, country=country)
        with self.assertRaises(ValidationError):
            note_multi.clean()

    def test_ref_type(self):
        country = Country(name='A', lat=1, lng=1)
        note = Note(country=country)
        self.assertEqual(note.ref_type, 'country')

    def test_ref_id(self):
        country = Country(name='A', lat=1, lng=1)
        country.save()

        note = Note(country=country, content='something')
        self.assertEqual(note.ref_id, country.id)
