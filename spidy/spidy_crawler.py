#!/usr/local/bin/python3

import io
import os
import sys

from imohash import hashfile
from PIL import Image
from pymongo import MongoClient


EXTS = ["jpg", "jpeg", "png", "gif"]


class Photo:
    def __init__(self, path):
        self.path = path
        self.ext = os.path.splitext(path)[1][1:]

    def get_metadata(self):
        self.size = os.path.getsize(self.path)
        self.hashe = hashfile(self.path, hexdigest=True)

    def to_json(self):
        return self.__dict__

    def get_json_id(self):
        return dict(path=self.path)

    def make_thumbnail(self):
        size = (128, 128)
        image = Image.open(self.path)
        image.thumbnail(size, Image.ANTIALIAS)
        stream = io.BytesIO()

        if False:
            image.save(stream, format="PNG")

        else:
            background = Image.new('RGBA', size, (255, 255, 255, 0))
            background.paste(
                        image, (int((size[0] - image.size[0]) / 2), int((size[1] - image.size[1]) / 2))
                        )
            background.save(stream, format="PNG")

        self.thumbnail = stream.getvalue()


# DB

def get_mongo_db():
    client = MongoClient("mongodb://127.0.0.1:27017")
    return client.library

# FILES

def all_files(directory, philter=None):
    for path, dirs, files in os.walk(directory):
        for f in files:
            target = os.path.join(path, f)
            if philter and not philter(target):
                continue
            yield target

def check_exts(exts):
    exts = [e.lower() for e in exts]
    def extension_checker(path):
        fn, ext = os.path.splitext(path)
        return ext.lower()[1:] in exts
    return extension_checker

# MAIN

def main(photo_dir_path):

    import time
    a = time.time()
    count = 0


    db = get_mongo_db()
    for photo_path in all_files(photo_dir_path, philter=check_exts(EXTS)):
        photo = Photo(photo_path)

        photo.get_metadata()
        photo.make_thumbnail()

        if db.photos.replace_one(photo.get_json_id(), photo.to_json(), upsert=True):
            #print(photo.path)
            print(".", sep="", end="", flush=True)
            count += 1

    b = time.time()
    print("\ndone.")
    print("%d photos scanned and added" % count)

    print("time: %s sec" % (b - a))



if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: %s <photo dir>" % sys.argv[0])
        sys.exit(1)

    main(sys.argv[1])
