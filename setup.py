#!/usr/bin/env python

from setuptools import setup

setup(name="photofloat",
      version="0.0.1",
      description="A Web 2.0 Photo Gallery Done Right via Static JSON & Dynamic Javascript",
      url="https://github.com/pR0Ps/PhotoFloat",
      license="GPLv2",
      classifiers=[
          "Programming Language :: Python :: 3",
          "Programming Language :: Python :: 3.3",
          "Programming Language :: Python :: 3.4",
          "Programming Language :: Python :: 3.5",
          "Programming Language :: Python :: 3.6",
      ],
      packages=["scanner"],
      install_requires=["pillow>=4.2.1,<4.3.0", "ExifRead>=2.1.2,<3.0.0"],
      entry_points={'console_scripts': ["photofloat=scanner.__main__:main"]}
)