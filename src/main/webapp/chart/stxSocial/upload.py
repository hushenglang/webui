from wsgiref import simple_server
from wsgiref.simple_server import WSGIRequestHandler
import re
import base64
import json
import os
import time

# This is a sample server to handle uploads of images and then serving them out again. This code
# is meant only as a sample. You must have python 2.x installed to use this code

port = 8000

def handle_post(environ, response):
    reader = environ['wsgi.input']
    content_length = int(environ['CONTENT_LENGTH'])
    #get the json out of the post package
    ajax = json.loads(reader.read(content_length))
    myid = ajax["id"]
    image = ajax["image"]
    
    # decode the base64 image
    dataUrlPattern = re.compile('data:image/(png|jpeg);base64,(.*)$')
    imgb64 = dataUrlPattern.match(image).group(2)
    if imgb64 is not None and len(imgb64) > 0:
        png = base64.b64decode(imgb64)
        
    # save the image, modify this to put the image in the directory you desire
    filename = "./" + myid + ".png"
    w = open(filename, "wb")
    try:
        w.write(png)
    finally:
        w.close()

    # formulate the URL that can be used to retrieve the image
    fileUrl = "/" + str(myid) + ".png"
    
    # be sure to set the access-control-allow-origin if using cross domain ajax
    headers = [('Content-Type', "text/html"), ('Access-Control-Allow-Origin','*')]
    response('200 OK', headers)
    return [fileUrl]

# Rudimentary function to serve static pages. Ideally you would use a real web server to serve
# pages but this is included so that the test server can be used as a standalone
def serve_static(environ, path, response):
    mime_type = "text/html; charset=UTF-8"
    path = path.replace('..','')
    session = None
    if path[0] != '/':
        path = '/' + path
    filename = "./" + path
    if not os.path.exists(filename) or not os.path.isfile(filename):
        response('404 NOT FOUND', [('Content-Type', 'text/html')])
        return ['File not found']
    if re.search(r"\.js$", filename) :
        mime_type = "text/javascript"
    elif re.search(r"\.gif$", filename) :
        mime_type = "image/gif"
    elif re.search(r"\.jpg$", filename) :
        mime_type = "image/jpeg"
    elif re.search(r"\.png$", filename) :
        mime_type = "image/png"
    elif re.search(r"\.css$", filename) :
        mime_type = "text/css"
    stats = os.stat(filename)
    ts = time.gmtime(stats.st_mtime)
    ts = time.strftime("%a, %d %b %Y %H:%M:%S +0000", ts)
    headers = [('Content-Type', mime_type),
               ('Content-Length', str(stats.st_size)),
               ('Last-Modified', ts)]
    if mime_type=="text/html; charset=UTF-8" or mime_type=="text/javascript":
        headers.append(('Expires', "-1"))
    response('200 OK', headers)
    return open(filename, 'rb')

# A very basic wsgi application which either saves an image or serves one up
def application(environ, response):
    path = environ['PATH_INFO']
    if environ['REQUEST_METHOD'].upper() == 'POST':
        return handle_post(environ, response)
    elif re.search(r"(\.html$)|(\.htm$)|(\.js$)|(\.gif$)|(\.png$)|(\.jpg$)|(\.css$)", path) :
        return serve_static(environ, path, response)
    response('501 NOT IMPLEMENTED', [('Content-Type', 'text/html')])
    return ['Mime type not implemented']

def serve():

    class CustomRequestHandler(simple_server.WSGIRequestHandler):
        def address_string(self):
            """Disable client reverse dns lookup."""
            return  self.client_address[0]
        
    httpd = simple_server.make_server('',port, application, handler_class=CustomRequestHandler)
    httpd.serve_forever()

if __name__ == '__main__':
    serve()