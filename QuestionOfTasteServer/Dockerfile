FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS runtime
WORKDIR /app
EXPOSE 1219/tcp

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
COPY . /src
WORKDIR /src
RUN dotnet build "QuestionOfTasteServer.sln" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "QuestionOfTasteServer.sln" -c Release -o /app/publish

FROM runtime AS final
RUN mkdir -p /var/lib/qot/appdata
ENV QOT_APPLICATION_DATA=/var/lib/qot/appdata
VOLUME [ "/var/lib/qot/appdata" ]
RUN mkdir -p /var/log/qot
ENV QOT_APPLICATION_LOGS=/var/log/qot
VOLUME [ "/var/log/qot" ]
RUN mkdir -p /opt/qot/question-of-taste-server/bin
WORKDIR /opt/qot/question-of-taste-server/bin
COPY --from=publish /app/publish /opt/qot/question-of-taste-server/bin
EXPOSE 1219
ENTRYPOINT ["dotnet", "QuestionOfTasteServer.dll"]
